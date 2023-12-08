/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAccountStore, usePermissionsStore, useSessionStore } from "../store/profile.store";
import { Login } from "../services/login.service";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { Credentials, UserPermissions } from "../@types/global";
import { getAuthUser, getPermissions } from "../services/auth.service";
import { ApiRequest, authRequest } from "../services/provider/axios";
import { authedRequestInterceptor } from "../services/provider/middleware/request.middleware";
import { ROUTES } from "../lib/constants/app.constants";


export const useAuthHook = () => {

    const [authedAxios, setAuthedAxios] = useState<ApiRequest>( authRequest() )

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
            navigate(ROUTES.LOGIN, { replace: true })
            resetAll()
            return 
        }

        setAuthedAxios(
            authRequest({
                req: authedRequestInterceptor(session.token)
            })
        )

        if (location.pathname === ROUTES.LOGIN) navigate(ROUTES.MAIN, { replace: true })

        refreshPermissions()
        updateUserAndAgentData()

    }, [session.token, location.pathname, authRequest])


    const refreshPermissions = async () => {
        try {
            const response = await getPermissions(authedAxios)()

            console.log('Refresh Permissions', response)

            if (!response.success) throw new Error(response.message + ', ' + response.data)

            control.setPermissionsData(response.data)

            return true

        } catch (err) {

            if (err instanceof Error)
                toast.error(`Error cargando los permisos del usuario ${session.user?.username}: ${err.message ?? err}`)

            resetAll()

            return false
        }
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


    const updateUserAndAgentData = async (): Promise<boolean> => {
        try {
            const response = await getAuthUser(authedAxios)()

            if (response.success === false) throw new Error(response.message + ', ' + response.data)
            if (response.data === undefined
                || typeof response.data === 'string') throw new Error("User data was not received")


            session.setUserData(response.data)

            return true

        } catch (err) {

            if (err instanceof Error)
                toast.error(`Error de sesion en ${location}: ${err.message ?? err}`)

            resetAll()

            return false
        }
    }

    const login = async (credentials: Credentials) => {
        const result = await Login(authRequest())(credentials)

        if (!result.success) {
            toast.error(result.message, {
                description: result.data,
                duration: 5000
            })
            return false
        }

        session.setToken(result.data)
        toast.success(result.message)
    }

    return {
        login,
        authed: session.user,
        access: control.permissions,
        agent: account.agent,
        canAccess
    }
}