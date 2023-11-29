import { CustomAxiosError } from "../../../@types/global";

function requestHandlerError(error: Error) {
    console.error('Request Error:', error)
    throw new Error(`Error in Request ${error.message}`);
    
}

async function responseHandlerError(error: CustomAxiosError) {
    const response = error?.response?.data?.message

    // Server response with status code 400 or upper and contains message and maybe data object
    if (response) {
        console.error(`Axios error code ${error.response.status}`, error.response.data)
        throw new Error(`Code: ${error.response.status}, Message: ${response}`);
    }

    // Cannot get any server response data, throw Axios error connection message
    throw new Error(`Connection Error: ${error.message.toLocaleUpperCase()}`);
    
}

export { requestHandlerError, responseHandlerError }