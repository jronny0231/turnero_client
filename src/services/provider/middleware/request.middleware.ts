import { InternalAxiosRequestConfig } from "axios"

export const authedRequestInterceptor = (token?: string | null) => (config: InternalAxiosRequestConfig<unknown>) => {

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
}