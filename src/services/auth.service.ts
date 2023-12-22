import { UserData, AgentData, UserPermissions } from "../@types/schema";
import { PATH_URI } from "../lib/constants/api.constants";
import { type ApiRequest } from "./provider/axios";


export const getAuthUser = (axios: ApiRequest) => async () => {

    try {
        const resp = await axios.get<UserData>(PATH_URI.PROFILE);
        return {
            success: true,
            message: "Datos obtenidos satisfactoriamente",
            data: resp.data,
        }

    } catch (error: unknown) {
        return {
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
            message: "Error intentando obtener los permisos del usuario",
            data: String(error)
        }
    }
}

export const getAgentData = (axios: ApiRequest) => async () => {

    try {
        const resp = await axios.get<AgentData>(PATH_URI.LOGGED_USER_AGENT);
        return {
            success: true,
            message: "Datos obtenidos satisfactoriamente",
            data: resp.data,
        }

    } catch (error: unknown) {
        return {
            message: "Error intentando obtener los datos del usuario",
            data: String(error)
        }
    }
}

export const refreshToken = (axios: ApiRequest) => async () => {
    
    try {
        const resp = await axios.get<string>(PATH_URI.NEW_TOKEN);
        return {
            success: true,
            message: "Token actualizado",
            data: resp.data,
        }

    } catch (error) {
        return {
            message: "Error intentando actualizar el token",
            data: String(error)
        }
    }
}