import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: "libelulis.firebaseapp.com",
    projectId: "libelulis",
    storageBucket: "libelulis.appspot.com",
    messagingSenderId: "588591499894",
    appId: "1:588591499894:web:a56ae133a8d2794a1fed57",
    measurementId: "G-HXMVMT3EG6",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
