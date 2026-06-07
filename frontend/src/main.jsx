import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy_client_id_please_change';
console.log("Google Client ID is currently set to:", clientId === 'dummy_client_id_please_change' ? 'FAKE DUMMY ID' : 'USER PROVIDED ID', clientId);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
