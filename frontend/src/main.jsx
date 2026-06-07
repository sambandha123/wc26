import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'
import './index.css'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
import App from './App.jsx'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'dummy_client_id_please_change';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
