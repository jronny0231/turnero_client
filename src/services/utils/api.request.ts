import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { Api, Env, Path } from './axios.const'
import { CustomAxiosError } from '../../types';
import axiosRequestErrorHandler from '../../helpers/axiosRequestErrorHandler';
import { getLocalStorage, setLocalStorage, stateType } from '../../store/localStorage';
import { refreshToken } from '../login.service';


interface ApiRequest {
    get: (path: string) => Promise<any>,
    post: (path: string, data: object) => Promise<any>,
    put: (path: string, data: object) => Promise<any>,
    delete: (path: string) => Promise<any>
}

const authInstance: AxiosInstance = axios.create({
	baseURL: Api.BASEAPI,
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
	baseURL: Api.BASEAPI,
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

		const token: stateType = getLocalStorage(Env.LOCAL_TOKEN_KEY)
        if(token){
            config.headers.Authorization =  `Bearer ${token}`;
        }

		return config
	},
	error => {
		console.error({AxiosRequestError: error})
		return Promise.reject(axiosRequestErrorHandler(error));
	}
)

authInstance.interceptors.response.use(
	response => {

		// Login and Refresh Token
		const token: stateType = getLocalStorage(Env.LOCAL_TOKEN_KEY)
		let newToken: any|undefined = response.data.token;

		if(newToken){
			setLocalStorage(Env.LOCAL_TOKEN_KEY, newToken)
		}

		axios.get(Api.BASEAPI + Path.NEW_TOKEN, 
			{
				headers: {
				  'Authorization': `Bearer ${token}` 
				}
			}).then(resp => {
				const newToken: string = resp.data.token
				if(newToken){
					setLocalStorage(Env.LOCAL_TOKEN_KEY, newToken)
				}
			}).catch(error => {
				console.log({RefreshingTokenAxiosError: error})
				return Promise.reject(axiosRequestErrorHandler(error));
			})

		return response;
	}, async (error: AxiosError) => {

		console.error({AxiosResponseError: error})
		return Promise.reject(axiosRequestErrorHandler(error));
	}
)

unAuthInstance.interceptors.request.use(
	config => config,
	
	error => {
		console.error({AxiosError: error})
		return Promise.reject(axiosRequestErrorHandler(error));
	}
)

unAuthInstance.interceptors.response.use(
	response => response,
	
	async (error: AxiosError) => {
		console.error({AxiosError: error})
		return Promise.reject(axiosRequestErrorHandler(error));
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

	post: (url: string, body: {}) => instance.post(url, body)
		.then(responseBody)
		.catch(responseErr),

	put: (url: string, body: {}) => instance.put(url, body)
		.then(responseBody)
		.catch(responseErr),

	delete: (url: string) => instance.delete(url)
		.then(responseBody)
		.catch(responseErr),
	}
}

export const authRequest = MethodRequest(authInstance)
export const unAuthRequest = MethodRequest(unAuthInstance)