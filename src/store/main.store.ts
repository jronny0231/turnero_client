import { create } from "zustand"
import { persist } from "zustand/middleware"
import { mainStoreType } from "../@types/types"

interface accountStore extends Pick<mainStoreType, 'agent'> { 
    setAgentData: (agent: object) => void
}

interface permissionsStore extends Pick<mainStoreType, 'permissions'> {
    setPermissionsData: (permissions: object[]) => void
}

interface sessionStore extends Pick<mainStoreType, 'user'>{
    token: string | null
    setToken: (token: string) => void,
    setUserData: (user: object) => void,
}



export const useSessionStore = create<sessionStore>()(persist( (set) => {
    return {
        token: null,
        user: null,

        setToken: (token: string) => set(() => ({token: token})),
        setUserData: (user: object) => set(() => ({ user: user}))
    }
},{ name: 'session'}))


export const useAccountStore = create<accountStore>()(persist( (set) => {
    return {
        agent: null,
        
        setAgentData: (agent: object) => set(() => ({
            agent: agent
        })),
    }
}, {
    name: "account",
}))

export const usePermissionsStore = create<permissionsStore>()(persist( (set) => {
    return {
        permissions: [],

        setPermissionsData: (permissions: object[]) => set(() => ({
            permissions: permissions
        }))
    }
}, { name: 'permissions'}))