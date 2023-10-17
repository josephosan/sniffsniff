const AUTH_TOKEN_NAME = 'ID_TOKEN';

const saveToken = (key: string = AUTH_TOKEN_NAME, token: string): void => {
    window.localStorage.setItem(key, token);
}

const getToken = (key: string = AUTH_TOKEN_NAME): string => {
    return window.localStorage.getItem(key);
}

const destroyToken = (key: string = AUTH_TOKEN_NAME): void => {
    window.localStorage.removeItem(key);
}


export { saveToken, getToken, destroyToken };