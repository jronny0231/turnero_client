import { AxiosError } from 'axios'

export interface CustomAxiosError extends AxiosError<unknown, any> {
	response: CustomAxiosResponse;
}

export interface CustomAxiosResponse extends AxiosResponse {
	data: CustomAxiosResponseData
}

export type CustomAxiosResponseData = {
    message?: string,
    code?: number
}



export type Credentials = {
    username: FormDataEntryValue,
    password: FormDataEntryValue
}

export type InputQueues = {
    tipo_identificacion_id: number,
	identificacion: string,
    es_tutor: boolean,
	servicio_destino_id: number
}

export type Ticket = {
    id: number,
    secuencia_ticket: string,
    cola_posicion: number,
    createdAt: Date,
}

export type UserData = {
    id: number,
    nombres: string,
    correo: string,
    username: string,
    activo: boolean,
    createdAt: Date,
    rol: {
        id: number,
        nombre: string,
        descripcion: string,
        activo: boolean
    }
}

export type GrupoServicio = {
    id: number,
    descripcion: string,
    color_hex: string
}

export type TipoAgente = {
    id: number,
    nombre: string,
    nombre_corto: string,
    descripcion: string,
    estatus: boolean
}

export type Departamento = {
    id: number,
    descripcion: string,
    siglas: string,
    createdAt: Date,
    updatedAt: Date
}

export type Sucursal = {
    id: number,
    descripcion: string
    siglas: string,
    direccion_id: number,
    estatus: boolean,
    createdAt: Date,
    updatedAt: Date
}

export type AgentData = {
    id: number,
    nombre: string,
    descripcion: string,
    estatus: boolean,
    grupo_servicio: GrupoServicio
    tipo_agente: TipoAgente,
    departamento_sucursal: {
        departamento: Departamento,
        sucursal: Sucursal
    }
}


export type Response <type> = {
    success: boolean,
    message?: string,
    data?: type
}



export type AuthContext = {
    user: UserData | null,
    agent: AgentData | null,
    login: (credentials: Credentials) => void
    logout: () => void, 
}