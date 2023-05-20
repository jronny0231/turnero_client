import { Path } from "./utils/axios.const";
import { authRequest } from "./utils/api.request";
import { AgentData, Response, UserData } from "../types";

export const getAuthAgent = async (): Promise< Response<AgentData | {message:string}>> => {

    try{
        const resp: Response<AgentData> = await authRequest.get(Path.LOGGED_USER_AGENT);
        return {
                success: true,
                message: resp.message,
                data: resp.data,
        }
    } catch (error: any) {
        return Promise.reject(
            {
                success: false,
                message: `Error intentando obtener los datos de agente para el usuario logueado: ${error}`,
                data: {message: error.message}
            }
        )
    }
}