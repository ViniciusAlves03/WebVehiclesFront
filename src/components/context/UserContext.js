import { createContext } from "react";

import useAuth from "../hooks/UseAuth.js";

const Context = createContext()

function UserProvider({ children }) {

    const { authenticated, register, login, logout, loginStore, registerStore } = useAuth()

    return <Context.Provider value={{ authenticated, register, login, logout, loginStore, registerStore }}>{children}</Context.Provider>
}

export { Context, UserProvider }
