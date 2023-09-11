import { AxiosError } from 'axios'

export type mainStoreType = {
    user: object | null
    agent: object | null
    permissions: object[] | []
}

export interface CustomAxiosError extends AxiosError<unknown, T> {
	response: CustomAxiosResponse;
}