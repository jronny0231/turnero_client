import { useEffect, useMemo, useState } from "react";
import { useAccountStore, usePermissionsStore, useSessionStore } from "../store/profile.store";
import { Login, Logout } from "../services/login.service";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { Credentials, UserPermissions } from "../@types/global";
import { getAuthUser, getPermissions, refreshToken } from "../services/auth.service";
import { ApiRequest, axiosInstance } from "../services/provider/axios";
import { authedRequestInterceptor } from "../services/provider/middleware/request.middleware";
import { ROUTES } from "../lib/constants/app.constants";


/**
 * ****** TO-DO
 * Usar este objeto para setear los estados en el hock de profile.store:
 * - setToken (login, logout, refresh)
 * - reset All function
 * 
 * Crear un ContextProvider siguiendo buenas practicas para gestionar los datos de session
 * tambien para inyectar mediante zustand los datos de usuario y la instancia de axios seteada.
 * Si hay un error se limpiara mediante auth.hook
 */


export const useAuthHook = () => {

    const [authedAxios, setAuthedAxios] = useState<ApiRequest>(axiosInstance())

    const session = useSessionStore(store => store)
    const account = useAccountStore(store => store)
    const control = usePermissionsStore(store => store)

    const location = useLocation()


    const navigate = useNavigate()

    const resetAll = () => {
        session.reset()
        account.reset()
        control.reset()
    }

    // Load on instance auth hook and check session data, location path and redirect according to logic.
    useEffect(() => {

        if (session.token === null) {
            if (location.pathname !== ROUTES.LOGIN) navigate(ROUTES.LOGIN, { replace: true })
            resetAll()
            return
        }

        refreshToken(authedAxios)()
            .then(response => {
                if (response.success) {
                    console.log('Token Refreshed', response.data)
                    session.setToken(response.data)
                }
                else {
                    toast.error(response.message, {
                        description: response.data
                    })
                    resetAll()
                }
            })

        if (location.pathname === ROUTES.LOGIN) navigate(ROUTES.MAIN, { replace: true })


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session.token])


    const refreshPermissions = async () => {

        const response = await getPermissions(authedAxios)()
        if (!response.success) throw new Error(response.message + ', ' + response.data)

        control.setPermissionsData(response.data)

        return true
    }

    const updateUserData = async (): Promise<boolean> => {

        const response = await getAuthUser(authedAxios)()
        if (!response.success) throw new Error(response.message + ', ' + response.data)

        session.setUserData(response.data)

        return true
    }

    const canAccess = ({ path, make }: { path: string, make: keyof UserPermissions['can'] }) => {

        if (control.permissions === null) {
            resetAll()
            return false
        }

        const permission = control.permissions
            .filter(access => (access.slug === path && access.can[make]))

        if (permission.length === 0) {
            return false
        }

        return true
    }



    const login = async (credentials: Credentials) => {
        const result = await Login(axiosInstance())(credentials)

        if (!result.success) {
            toast.error(result.message, {
                description: result.data,
                duration: 5000
            })
            return false
        }

        session.setToken(result.data)
        toast.success(result.message)

        return true
    }

    const logout = async () => {
        const result = await Logout(authedAxios)()

        if (!result.success) {
            toast.error(result.message, {
                description: result.data,
                duration: 5000
            })
            return false
        }

        resetAll()
        toast.success(result.message)
    }

    useMemo(() => {
        setAuthedAxios(
            axiosInstance({
                req: authedRequestInterceptor(session.token)
            })
        )

        if (session.token) {
            refreshPermissions().catch(err => {
                void console.error('Permission Set Error', err)
                resetAll()
            }).then(() => {
                updateUserData().catch(err => {
                    void console.error('User Data Set Error', err)
                    resetAll()
                })
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session.token])

    return {
        login,
        logout,
        authed: session.user,
        access: control.permissions,
        agent: account.agent,
        canAccess
    }
}