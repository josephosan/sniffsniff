import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import './styles/main.scss'
import {AuthProvider} from "./store/auth.store";
import {AppProvider} from "./store/app.store";
import {NotifyProvider} from "./store/notify.store";
import {ConfigProvider} from "antd";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <AppProvider>
            <ConfigProvider theme={{token: {fontFamily: "IRAN-sans"}}}>
                <NotifyProvider>
                    <App/>
                </NotifyProvider>
            </ConfigProvider>
        </AppProvider>
    </AuthProvider>
)
