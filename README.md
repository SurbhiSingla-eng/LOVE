# LOVE Chat 💬

A clean, modern, real-time messaging application featuring instant communication, secure authentication, and media sharing[cite: 1]. Built with **Vanilla JavaScript**, **Tailwind CSS**, and backed by **Firebase Services**[cite: 1].

---

## 🚀 Features

- 🔐 **Google Authentication**: Quick and secure sign-in/sign-out through Firebase Auth[cite: 1].
- ⚡ **Real-time Messaging**: Instant text delivery powered by Firebase Firestore listeners[cite: 1].
- 🖼️ **Media Sharing**: Upload and render images seamlessly via Firebase Cloud Storage[cite: 1].
- 🌓 **Modern UI**: Fully responsive interface built with Tailwind CSS, supporting dark/light UI tokens[cite: 1].
- 🔒 **Secure Framework**: Configured for clean access control using Firestore Security Rules[cite: 1].

---

## 📁 Project Structure

```text
love-chat/
│
├── index.html          # Application structure & Tailwind layout
├── app.js              # Application core logic & UI rendering
├── firebase-config.js  # Firebase SDK initializations
└── README.md           # Documentation
```[cite: 1]

---

## 🛠️ Setup & Installation

### 1. Clone or Recreate the Files
Create a local directory named `love-chat` and create the three core files (`index.html`, `app.js`, `firebase-config.js`) using the code snippets provided[cite: 1].

### 2. Configure Firebase
1. Go to the [Firebase Console](https://console.firebase.google.com/)[cite: 1].
2. Click **Add Project** and name it `love-chat` (or any preferred identifier)[cite: 1].
3. In your project dashboard, enable the following services[cite: 1]:
   - **Authentication**: Enable **Google** as a Sign-in provider[cite: 1].
   - **Firestore Database**: Create a database in **Production Mode** or **Test Mode**[cite: 1].
   - **Storage**: Enable Cloud Storage to support image uploads[cite: 1].
4. Register a web application within your Firebase project to generate your unique credentials configuration object[cite: 1].

### 3. Update Environment Keys
Open `firebase-config.js` and populate the placeholder keys with the credentials matching your Firebase Web App configuration[cite: 1]:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```[cite: 1]

### 4. Deploy Security Rules
Navigate to your Firebase console sections and enforce the following rules[cite: 1]:

#### **Cloud Firestore Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageId} {
      allow read, write: if request.auth != null;
    }
  }
}
```[cite: 1]

#### **Storage Rules**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /chats/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```[cite: 1]

---

## 🌐 Local Development

Because this project imports the Firebase SDK via native ES modules (`type="module"`), launching `index.html` by double-clicking it directly in a web browser will trigger a CORS blocking policy[cite: 1]. 

To run the application locally, serve it from a local server environment[cite: 1]:

### Using VS Code (Recommended)
1. Install the **Live Server** extension[cite: 1].
2. Right-click `index.html` and select **Open with Live Server**[cite: 1].

### Using Python
Alternatively, run one of the following commands in your terminal inside the project directory[cite: 1]:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```[cite: 1]
Open your web browser and navigate to `http://localhost:8000`[cite: 1].

---

## 🚀 Deployment via Firebase Hosting

To publish your application online using Firebase Hosting, complete these steps in your terminal[cite: 1]:

1. **Install Firebase CLI Tools globally:**
```bash
   npm install -g firebase-tools
   ```[cite: 1]
2. **Log into your Firebase account:**
```bash
   firebase login
   ```[cite: 1]
3. **Initialize the hosting project structure:**
```bash
   firebase init hosting
   ```[cite: 1]
   *Configuration choices during initialization:*
   - Select **Use an existing project** and pick your Firebase project ID[cite: 1].
   - Set your public directory to `.` (type a single dot to specify the current directory, or press enter to default to `public` and move your files inside that generated folder)[cite: 1].
   - Configure as a single-page app: **No**[cite: 1].
   - Set up automatic builds and deploys with GitHub: **No**[cite: 1].
4. **Deploy your site:**
```bash
   firebase deploy --only hosting
   ```[cite: 1]
Your console will output a live tracking URL (e.g., `https://your-project-id.web.app`) where your app is hosted[cite: 1].
