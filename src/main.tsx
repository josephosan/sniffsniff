import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import './styles/main.scss'
import {AuthProvider} from "./store/auth.store";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </React.StrictMode>
)
