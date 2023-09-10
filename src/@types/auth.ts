// to define User interface. add more fields as needed.
export interface User {
    username: string
}

// to define AuthContext provider type.
export interface AuthStore {
    isAuthenticated: boolean,
    user: User | null,
    login: (user: User) => void,
    logout: () => void
}


