/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useAccountStore, usePermissionsStore, useSessionStore } from "../store/profile.store";
import { Login } from "../services/login.service";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { Credentials } from "../@types/global";
import { getAuthUser, getPermissions } from "../services/auth.service";
import { authRequest } from "../services/provider/axios";
import { authedRequestInterceptor } from "../services/provider/middleware/request.middleware";
import { ROUTES } from "../constants/app.constants";


export const useAuthHook = () => {
    
    const session = useSessionStore(store => store)
    const account = useAccountStore(store => store)
    const permissions = usePermissionsStore(store => store)

    const location = useLocation()


    const navigate = useNavigate()

    const resetAll = () => {
        session.reset()
        account.reset()
        permissions.reset()
    }

    const fakeData = () => {
        session.setToken("fake")

        session.setUserData({
            id: 1,
            nombres: 'Faker User',
            username: 'fakeruser',
            activo: true,
            correo: 'fake@user.com',
            createdAt: new Date(),
            rol: {
                id: 1,
                activo: true,
                nombre: 'Administrador',
                descripcion: 'Administra recursos'
            },
            type: 'USER'
        })

        permissions.setPermissionsData([
            {
                id: 1,
                slug: '/admin',
                nombre: 'Administracion',
                can: { create: false, read: true, update: false, delete: false, }
            },
            {
                id: 2,
                slug: '/users',
                nombre: 'Usuarios',
                parent_id: 1,
                can: { create: true, read: true, update: true, delete: true, }
            },
            {
                id: 3,
                slug: '/queues',
                nombre: 'Turnos',
                can: { create: true, read: true, update: true, delete: true, }
            },
            {
                id: 4,
                slug: '/profile',
                nombre: 'Perfil',
                can: { create: false, read: true, update: true, delete: false, }
            }
        ])  
    }

    const authedAxios = () => {
        return authRequest({
            req: authedRequestInterceptor(session.token)
        })
    }

    // Load on instance auth hook and check session data, location path and redirect according to logic.
    React.useEffect(() => {
        
        fakeData(); return 

        if (session.token === null) {
            navigate(ROUTES.LOGIN, {replace: true})
            return resetAll()
        }

        if (location.pathname === ROUTES.LOGIN) navigate(ROUTES.MAIN, {replace: true})

        refreshPermissions()
        updateUserAndAgentData()

    }, [session.token])


    const refreshPermissions = async () => {
        try {
            const response = await getPermissions(authedAxios())()
            
            if (response.success === false) throw new Error(response.message + ', ' + response.data)

            if (typeof response.data !== 'string') {
                permissions.setPermissionsData(response.data)
            }

            return true

        } catch (err) {
            
            if (err instanceof Error)
            toast.error(`Error cargando los permisos del usuario ${session.user?.username}: ${err.message ?? err}`)

            resetAll()

            return false
        }
    }


    const updateUserAndAgentData = async (): Promise<boolean> => {
        try {
            const response = await getAuthUser(authedAxios())()

            if (response.success === false) throw new Error(response.message + ', ' + response.data)
            if (response.data === undefined
                || typeof response.data === 'string') throw new Error("User data was not received")

            
            session.setUserData(response.data)

            return true

        } catch(err) {
           
            if (err instanceof Error)
            toast.error(`Error de sesion en ${location}: ${err.message ?? err}`)

            resetAll()

            return false
        }
    }

    const login = async (credentials: Credentials) => {
        const result = await Login(authRequest({}))(credentials)

        if (result.success === false) {
            toast.error(result.message, {
                description: result.data,
                duration: 5000
            })
            return false
        }

        if (result.data) {
            session.setToken(result.data)
            toast.success(result.message)
            navigate("/", {replace: true})
        }
    }    

    return { login, authed: session.user }
}