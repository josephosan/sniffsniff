// to define User interface. add more fields as needed.
export interface User {
    firstname: string,
    lastname: string,
    email: string,
    createdAt: string,
    updatedAt: string
}

// to define AuthContext provider type.
export interface AuthStore {
    isAuthenticated: boolean,
    user: User | null,
    handleSetTokens: (data: never) => void,
    handleSetUser: (data: User) => void,
    logout: () => void
}


