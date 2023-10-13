import React, {createContext, useContext} from "react";
import {notification, message} from "antd";
import {AlertPlacement, AlertTypes, NotificationStore} from "../@types/notify";

const NotifyContext = createContext<NotificationStore | undefined>(undefined);

export function useNotify() {
    const context = useContext(NotifyContext);
    if (!context) throw new Error('Looks like you are using the useNotify, outside the NotifyProvider. check it out.');
    return context;
}

export const NotifyProvider: React.FC = ({children}) => {
    const [api, contextHolder] = notification.useNotification();
    const [messageApi, messageApiContextHolder] = message.useMessage();

    const showAlert = (type: AlertTypes, title: string, desc: string, placement: AlertPlacement = 'bottomLeft', duration: number = 3) => {
        api[type]({
            message: title,
            description: desc,
            placement: placement,
            duration: duration
        });
    }

    const showMessage = (type: AlertTypes, message: string, duration: number = 3) => {
        messageApi[type](message, [duration]);
    }

    const notifyStore: NotificationStore = {
        showAlert,
        showMessage
    }

    return (
        <NotifyContext.Provider value={notifyStore}>
            {messageApiContextHolder}
            {contextHolder}
            {children}
        </NotifyContext.Provider>
    );
}