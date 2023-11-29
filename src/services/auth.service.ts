import { Response, UserData, UserPermissions } from "../@types/global";
import { PATH_URI } from "../constants/api.constants";
import { type ApiRequest } from "./provider/axios";


export const getAuthUser = (axios: ApiRequest) => async () => {

    try {
        const resp = await axios.get<UserData>(PATH_URI.PROFILE);
        return {
            success: true,
            message: "Datos obtenidos satisfactoriamente",
            data: resp.data ?? undefined,
        }

    } catch (error: unknown) {
        return {
            success: false,
            message: "Error intentando obtener los datos del usuario",
            data: String(error)
        }
    }
}

export const getPermissions = (axios: ApiRequest) => async () => {

    try {
        const resp = await axios.get<UserPermissions[]>(PATH_URI.LOGGED_USER_PERMISSIONS);
        return {
            success: true,
            message: "Datos obtenidos satisfactoriamente",
            data: resp.data,
        }
    } catch (error) {
        return {
            success: false,
            message: "Error intentando obtener los permisos del usuario",
            data: String(error)
        }
    }
}

export const refreshToken = (axios: ApiRequest) => async (): Promise<string|null> => {
    
    try {
        const resp = await axios.get(PATH_URI.NEW_TOKEN) as Response<{token: string}>;
        return resp.data?.token ?? null

    } catch (error: unknown) {
        return null;
    }
}