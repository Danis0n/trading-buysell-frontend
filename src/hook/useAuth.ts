import { createContext, useContext } from "react"
import Store from "../store/store";

interface State{
    store: Store,
}

const store = new Store();

export const AuthContext = createContext<State>({
    store
});

export function useAuth() {
    return useContext(AuthContext);
}