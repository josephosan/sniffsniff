export interface NotificationStore {
    showAlert: (type: AlertTypes, title: string, desc: string, placement: AlertPlacement, duration: number) => void;
}

export type AlertPlacement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export type AlertTypes = 'success' | 'info' | 'warning' | 'error';