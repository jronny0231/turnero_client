import { Path } from "./utils/axios.const";
import { authRequest } from "./utils/api.request";

export type ServicesGroup = {
    id: number,
	descripcion: string,
    color_hex: string
}

export type Services = {
    id: number,
    descripcion: string,
    nombre_corto: string,
    prefijo: string,
    es_seleccionable: boolean,
    grupo: ServicesGroup,
}

export type Response <type> = {
    success: boolean,
    message?: string,
    data?: type
}

export const getServicesGroup = async (): Promise< Response<any> | undefined> => {

    try{
        const resp: Response<ServicesGroup> = await authRequest.get(Path.GROUP_SERVICES);

        return {
                success: true,
                data: resp.data,
        }
    } catch (error) {
        return {
            success: false,
            message: "Error intentando conseguir los grupos de servicios",
            data: error
        }
    }

    return
}

export const getServicesByGroup = async (groupId: number): Promise< Response<any> | undefined> => {
    const uri: string = Path.SERVICES_BY_GROUP.replace('#', String(groupId));
    try {
        const resp: Response<Services> = await authRequest.get(uri);

        return {
            success: true,
            data: resp.data
        }
        
    } catch (error) {
        return {
            success: false,
            message: `Error intentando conseguir los servicios de la categoria ${groupId}`,
            data: error
        }
    }

    return
        
}

