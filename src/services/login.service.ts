import {Path, Env} from "./utils/axios.const";
import { authRequest, unAuthRequest } from "./utils/api.request";
import { Credentials, Response, UserData } from "../types";

export const Login = async (credentials: Credentials): Promise<Response<string>> => {

    try{
        const resp: {token: string} = await unAuthRequest.post(Path.LOGIN, credentials);
        window.localStorage.setItem(Env.LOCAL_TOKEN_KEY, resp.token);

        return {
                success: true,
                message: `Usuario ${credentials.username} logueado con exito!`,
                data: resp.token ?? undefined,
        }
    } catch (error: any) {
        console.error({error})
        return {
            success: false,
            message: "Error intentando iniciar sesion",
            data: String(error.message)
        }
    }
}


export const Logout = async (): Promise<Response<string>> => {
    try {
        const resp: any = await authRequest.delete(Path.LOGOUT);
        window.localStorage.removeItem(Env.LOCAL_TOKEN_KEY);
        return {
            success: true,
            message: "Se ha cerrado sesión",
            data: resp
        }
        
    } catch (error: any) {
        return {
            success: false,
            message: "Error intentando cerrar sesión",
            data: String(error.message)
        }
    }        
}

export const getAuthUser = async (): Promise<Response<UserData|{message:string}>> => {
    try {
        const resp: any = await authRequest.get(Path.PROFILE);
        return {
            success: true,
            message: "Datos obtenidos satisfactoriamente",
            data: resp.data ?? undefined,
        }

    } catch (error: any) {
        return {
            success: false,
            message: "Error intentando obtener los datos del usuario",
            data: {message: error.message}
        }
    }
}

export const refreshToken = async (): Promise<string|null> => {
    
    try {
        const resp: {token: string} = await authRequest.get(Path.NEW_TOKEN);
        return resp.token

    } catch (error) {
        console.error({error})
        return null;
    }
}