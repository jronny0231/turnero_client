import { CustomAxiosResponseData } from "../types";
import { AxiosError } from "axios";
import { Env } from "../services/utils/axios.const";
import { setLocalStorage } from "../store/localStorage";


interface IDictionary<TValue> {
    [id: string]: TValue;
}

const messageTypes: IDictionary<string> = {
    "ERR_NETWORK": "Error al intentar conectarse con el servidor, intente mas tarde. ",
    "ERR_BAD_REQUEST": "Error en la solicitud: "
}

export default (error: AxiosError) => {
    const errorCode = (): number => {
        if(error.response?.status){
            return error.response.status
        }
        if(error.status){
            return error.status
        }
        return 500;
    }
    const errorMsg = (): string => {
        if(error.response?.data){
            const data: CustomAxiosResponseData = error.response.data as CustomAxiosResponseData
            return String(data.message)
        }
        if(error.code){
            return messageTypes[error.code] + error.message
        }
        return error.message
    }
    
    if(errorCode() === 403) {
        setLocalStorage(Env.LOCAL_TOKEN_KEY, null)
        window.location.reload()
    }

    return {
        type: errorCode(),
        message: errorMsg(),
    }
    
}