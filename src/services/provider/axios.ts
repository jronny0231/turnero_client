import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_API } from '../../lib/constants/api.constants';
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
		'Access-Control-Allow-Methods': '*',
		'Access-Control-Allow-Headers': '*',
		'Access-Control-Allow-Credentials': 'true'
	},
	withCredentials: true
});

class AxiosInstanceClass {
	instance: AxiosInstance;
	interceptors?: Interceptor
	
	constructor(instance: AxiosInstance) {
		this.instance = instance
	}

	setInterceptor (interceptors?: Interceptor) {
		this.interceptors = interceptors
		return this
	}

	get getInstance () {
		return settedInstance(this.instance)(this.interceptors)
	}
}

const settedInstance = (instance: AxiosInstance) => (interceptor?: Interceptor) => {
	instance.interceptors.request.use(
		config => interceptor?.req ? interceptor?.req(config) : config,
		requestHandlerError
	)

	instance.interceptors.response.use(
		response => interceptor?.res ? interceptor?.res(response) : response,
		responseHandlerError
	)

	return instance
}


const responseBody = <T>(response: CustomAxiosResponse) => response.data as T;

const MethodRequest = (instance: AxiosInstance) => (interceptor?: Interceptor): ApiRequest => {

	const performedAxios = new AxiosInstanceClass(instance)
							.setInterceptor(interceptor).getInstance

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

export const axiosInstance = MethodRequest(instance)