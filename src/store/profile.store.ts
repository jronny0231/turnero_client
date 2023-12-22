import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type mainStoreType, AccessType } from "../@types/global"
import { getAgentData, getAuthUser, getPermissions } from "../services/auth.service"
import { axiosInstance } from "../services/provider/axios"
import { authedRequestInterceptor } from "../services/provider/middleware/request.middleware"
import { STORAGE_KEYS } from "../lib/constants/app.constants"

type DataManagmentHook = {
    load: (token: string, reload?: boolean) => Promise<void>
    reset: () => void
}

interface sessionStore extends DataManagmentHook, Pick<mainStoreType, 'user'> {
    token: string | null
    setToken: (token: string) => void,
}
interface accountStore extends DataManagmentHook, Pick<mainStoreType, 'agent'> {

}

interface permissionsStore extends DataManagmentHook, Pick<mainStoreType, 'permissions'> {
    can: (props: AccessType) => boolean
}




export const useSessionStore = create<sessionStore>()(persist((set, get) => {
    return {
        token: null,
        user: null,

        setToken: (token: string) => set({ token: token }),

        load: async (token, reload) => {

            const oldUser = get().user

            if (oldUser === null || reload) {
                // DO FETCH AND STORE
                const axios = axiosInstance({ req: authedRequestInterceptor(token) })
                const result = await getAuthUser(axios)()

                if (result.success) set({ user: result.data })
            }
        },

        reset: () => set({
            token: null,
            user: null
        })
    }
}, { name: STORAGE_KEYS.SESSION }))


export const useAccountStore = create<accountStore>()(persist((set, get) => {
    return {
        agent: null,

        load: async (token, reload) => {
            const oldAgent = get().agent
            if (oldAgent === null || reload) {
                // DO FETCH AND STORE
                const axios = axiosInstance({ req: authedRequestInterceptor(token) })
                const result = await getAgentData(axios)()

                if (result.success) set({ agent: result.data })
            }
        },

        reset: () => set({ agent: null })
    }
}, {
    name: STORAGE_KEYS.ACCOUNT,
}))

export const usePermissionsStore = create<permissionsStore>()(persist((set, get) => {
    return {
        permissions: null,

        load: async (token, reload) => {
            const oldPermissions = get().permissions
            if (oldPermissions === null || reload) {
                // DO FETCH AND STORE
                const axios = axiosInstance({ req: authedRequestInterceptor(token) })
                const result = await getPermissions(axios)()

                if (result.success) set({ permissions: result.data })
            }
        },

        can: ({ slug, make }) => {
            const { permissions } = get()

            if (permissions === null) return false

            const matched = permissions
                .find(access => (access.slug === slug && access.can[make]))

            if (matched === undefined) return false

            return true
        },

        reset: () => set({ permissions: null })
    }
}, { name: STORAGE_KEYS.PERMISSIONS }))