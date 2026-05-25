import { auth, provider, db, storage } from './firebase-config.js';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const chatSection = document.getElementById('chat-section');
const loginSection = document.getElementById('login-section');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const fileInput = document.getElementById('file-input');
const messagesContainer = document.getElementById('messages-container');

// Auth State Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    loginSection.classList.add('hidden');
    chatSection.classList.remove('hidden');
    loadMessages();
  } else {
    loginSection.classList.remove('hidden');
    chatSection.classList.add('hidden');
    messagesContainer.innerHTML = '';
  }
});

// Login / Logout
loginBtn.addEventListener('click', () => signInWithPopup(auth, provider));
logoutBtn.addEventListener('click', () => signOut(auth));

// Send Message (Text & Media)
messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  const file = fileInput.files[0];
  const { uid, displayName, photoURL } = auth.currentUser;

  if (!text && !file) return;

  messageInput.value = '';
  fileInput.value = ''; // Clear inputs early for UX

  let fileUrl = null;

  if (file) {
    const fileRef = ref(storage, `chats/${uid}_${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    fileUrl = await getDownloadURL(snapshot.ref);
  }

  await addDoc(collection(db, "messages"), {
    text,
    fileUrl,
    createdAt: serverTimestamp(),
    uid,
    displayName,
    photoURL
  });
});

// Real-time Listener
function loadMessages() {
  const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
  
  onSnapshot(q, (snapshot) => {
    messagesContainer.innerHTML = '';
    snapshot.forEach((doc) => {
      const data = doc.data();
      const isMe = data.uid === auth.currentUser.uid;
      renderMessage(data, isMe);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
}

// Render message bubble (Tailwind styled)
function renderMessage(data, isMe) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `flex items-end gap-2 mb-4 ${isMe ? 'flex-row-reverse self-end' : 'self-start'}`;

  let mediaHtml = data.fileUrl ? `<img src="${data.fileUrl}" class="max-w-xs rounded-lg mt-2 shadow-sm" alt="Shared media"/>` : '';

  msgDiv.innerHTML = `
    <img src="${data.photoURL || 'https://via.placeholder.com/40'}" class="w-8 h-8 rounded-full shadow"/>
    <div class="flex flex-col ${isMe ? 'items-end' : 'items-start'}">
      <span class="text-xs text-gray-400 dark:text-gray-500 px-1">${data.displayName}</span>
      <div class="px-4 py-2 rounded-2xl text-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'}">
        ${data.text ? `<p>${data.text}</p>` : ''}
        ${mediaHtml}
      </div>
    </div>
  `;
  messagesContainer.appendChild(msgDiv);
}
