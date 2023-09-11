import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import * as Const from '../../constants/main';
import { useSessionStore } from '../../store/main.store';
import { CustomAxiosError } from '../../@types/types';

interface ApiRequest {
    get: (path: string) => Promise<unknown>,
    post: (path: string, data: object) => Promise<unknown>,
    put: (path: string, data: object) => Promise<unknown>,
    delete: (path: string) => Promise<unknown>
}

const authInstance: AxiosInstance = axios.create({
	baseURL: Const.BASE_API,
    headers: {
		'Content-Type': 'application/json',
        'Accept': 'application/x-www-form-urlencoded',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Credentials': 'true'
    },
	timeout: 15000,
});

const unAuthInstance: AxiosInstance = axios.create({
	baseURL: Const.BASE_API,
    headers: {
        'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Credentials': 'true'
    },
	timeout: 15000,
});


authInstance.interceptors.request.use(
	config => {
        const token: string | null = useSessionStore(store => store.token)

        if(token){
            config.headers.Authorization =  `Bearer ${token}`;
        }

		return config
	},
	error => {
		return Promise.reject(error);
	}
)

authInstance.interceptors.response.use(
	response => {

		// Login and Refresh Token
		const newToken: undefined | string = response.data.token;

		if(newToken){
            useSessionStore(store => store.setToken)(newToken)
		}
		return response;
	}, async (error: AxiosError) => {
		return Promise.reject(error);
	}
)

unAuthInstance.interceptors.request.use(
	config => config,
	
	error => {
		return Promise.reject(error);
	}
)

unAuthInstance.interceptors.response.use(
	response => response,
	
	async (error: AxiosError) => {
		return Promise.reject(error);
	}
)




const responseBody = (response: AxiosResponse) => response.data;

const responseErr = (error: CustomAxiosError) => {
	throw new AxiosError(error.response?.data?.message ?? error.request ?? error.message);
}

const MethodRequest = (instance: AxiosInstance): ApiRequest => {
	return {
	get: (url: string) => instance.get(url)
		.then(responseBody)
		.catch(responseErr),

	post: (url: string, body: object) => instance.post(url, body)
		.then(responseBody)
		.catch(responseErr),

	put: (url: string, body: object) => instance.put(url, body)
		.then(responseBody)
		.catch(responseErr),

	delete: (url: string) => instance.delete(url)
		.then(responseBody)
		.catch(responseErr),
	}
}

export const authRequest = MethodRequest(authInstance)
export const unAuthRequest = MethodRequest(unAuthInstance)
