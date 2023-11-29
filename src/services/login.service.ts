import { type Credentials, type Response } from "../@types/global";
import { PATH_URI } from "../constants/api.constants";
import { type ApiRequest } from "./provider/axios";

export const Login = (axios: ApiRequest) => async (credentials: Credentials) => {

    try{
        const resp = await axios.post<{token: string}>(PATH_URI.LOGIN, credentials);

        return {
                success: true,
                message: `Usuario ${credentials.username} logueado con exito!`,
                data: resp.data?.token ?? undefined,
        }
    } catch (error: unknown) {
        const errorMsg = (error instanceof Error) ? error.message : String(error)
        
        return {
            success: false,
            message: "Error intentando iniciar sesion",
            data: errorMsg
        }
    }
}


export const Logout = (axios: ApiRequest) => async () => {
    try {
        const resp = await axios.delete(PATH_URI.LOGOUT) as Response<string>;

        return {
            success: true,
            message: "Se ha cerrado sesión",
            data: String(resp.message)
        }
        
    } catch (error: unknown) {

        return {
            success: false,
            message: "Error intentando cerrar sesión",
            data: String(error)
        }
    }        
}