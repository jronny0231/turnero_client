import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type UserData, type SessionPermissionsData, type mainStoreType } from "../@types/global"
import { agentSchemaType } from "../helpers/schemas/agent.schema"

interface accountStore extends Pick<mainStoreType, 'agent'> { 
    setAgentData: (agent: agentSchemaType) => void
    reset: () => void
}

interface permissionsStore extends Pick<mainStoreType, 'permissions'> {
    setPermissionsData: (permissions: SessionPermissionsData[]) => void
    reset: () => void
}

interface sessionStore extends Pick<mainStoreType, 'user'>{
    token: string | null
    setToken: (token: string) => void,
    setUserData: (user: UserData) => void,
    reset: () => void
}



export const useSessionStore = create<sessionStore>()(persist( (set) => {
    return {
        token: null,
        user: null,

        setToken: (token: string) => set({token: token}),
        setUserData: (user: UserData) => set({ user: user}),
        reset: () => set({
            token: null,
            user: null
        })
    }
},{ name: 'session'}))


export const useAccountStore = create<accountStore>()(persist( (set) => {
    return {
        agent: null,
        
        setAgentData: (agent: agentSchemaType) => set({agent: agent}),
        reset: () => set({ agent: null })
    }
}, {
    name: "account",
}))

export const usePermissionsStore = create<permissionsStore>()(persist( (set) => {
    return {
        permissions: null,

        setPermissionsData: (permissions: SessionPermissionsData[]) => set({permissions: permissions}),
        reset: () => set({ permissions: null })
    }
}, { name: 'permissions'}))