import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_API } from '../../constants/api.constants';
import { CustomAxiosResponse, Response } from '../../@types/global';
import { requestHandlerError, responseHandlerError } from './handlers/error.handler';

export interface ApiRequest {
	get: <T>(path: string) => Promise<Response<T>>,
	post: <T>(path: string, data: object) => Promise<Response<T>>,
	put: <T>(path: string, data: object) => Promise<Response<T>>,
	delete: (path: string) => Promise<unknown>
}
type Interceptor = {
	req?: (config: InternalAxiosRequestConfig<unknown>) => InternalAxiosRequestConfig<unknown>
	res?: (res: AxiosResponse) => AxiosResponse
}

const instance: AxiosInstance = axios.create({
	baseURL: BASE_API,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/x-www-form-urlencoded',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Credentials': 'true'
	},
	timeout: 3000,
});


const settedInstance = (instance: AxiosInstance) => ({req, res}: Interceptor) => {
	instance.interceptors.request.use(
		config => req !== undefined ? req(config) : config,
		requestHandlerError
	)

	instance.interceptors.response.use(
		response => res !== undefined ? res(response) : response,
		responseHandlerError
	)

	return instance
}


const responseBody = <T>(response: CustomAxiosResponse) => response.data as T;

const MethodRequest = (instance: AxiosInstance) => ({req, res}: Interceptor): ApiRequest => {

	const performedAxios = settedInstance(instance)({req, res})

	return {
		get: <T>(url: string) => performedAxios.get(url)
			.then(responseBody<T>),
	
		post: <T>(url: string, body: object) => performedAxios.post(url, body)
			.then(responseBody<T>),
	
		put: <T>(url: string, body: object) => performedAxios.put(url, body)
			.then(responseBody<T>),
	
		delete: (url: string) => performedAxios.delete(url)
			.then(responseBody),
	}
}

export const authRequest = MethodRequest(instance)