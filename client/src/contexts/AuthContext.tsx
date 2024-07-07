import { createContext } from "react";

interface User {
    _id: string,
    email: string,
    username: string,
}

export const AuthContext = createContext<{ user: User | null }>({
    user: null
})

export const AuthProvider = AuthContext.Provider