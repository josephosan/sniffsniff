import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import './styles/main.scss'
import {AuthProvider} from "./store/auth.store";
import {AppProvider} from "./store/app.store";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <AppProvider>
            <App/>
        </AppProvider>
    </AuthProvider>
)
