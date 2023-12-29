import { useEffect } from "react";
import { useAccountStore, usePermissionsStore, useSessionStore } from "../store/profile.store";
import { Login, Logout } from "../services/login.service";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { Credentials } from "../@types/global";
import { axiosInstance } from "../services/provider/axios";
import { authedRequestInterceptor } from "../services/provider/middleware/request.middleware";
import { ROUTES } from "../lib/constants/app.constants";
import { refreshToken } from "../services/auth.service";


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

        const axios = axiosInstance({ req: authedRequestInterceptor(session.token) })
        
        refreshToken(axios)().then(result => {
            if (result.success) {
                return session.setToken(result.data)
            }

            toast.error(result.message, {
                description: result.data,
                duration: 5000
            })

            return resetAll()
        })

        if (location.pathname === ROUTES.LOGIN) navigate(ROUTES.MAIN, { replace: true })

        session.load(session.token)
        account.load(session.token)
        control.load(session.token)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, session.token])


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
        const axios = axiosInstance({ req: authedRequestInterceptor(session.token) })
        const result = await Logout(axios)()

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

    return {
        login,
        logout
    }
}