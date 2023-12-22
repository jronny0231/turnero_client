import { AxiosError, AxiosResponse } from 'axios'
import { AgentData, UserData, UserPermissions } from './schema'

export interface SessionPermissionsData
    extends Pick<UserPermissions, 'id' | 'slug' | 'can' | 'nombre' | 'parent_id'> {}

export type mainStoreType = {
    user: UserData | null
    agent: AgentData | null
    permissions: SessionPermissionsData[] | null
}

export interface CustomAxiosError extends AxiosError<unknown, T> {
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

export type Response <type> = {
    success: boolean,
    message?: string,
    data: type
}

export type AccessType = {
    slug: string
    make: keyof UserPermissions['can']
}

export type IconProps = {
    strokeWidth?: number | undefined;
    size?: number | undefined;
}