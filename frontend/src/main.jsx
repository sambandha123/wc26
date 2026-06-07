import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '240057242937-e5plqk1tgkkpeb31mbv328oj4kn2i3j6.apps.googleusercontent.com';
console.log("Google Client ID:", clientId);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
