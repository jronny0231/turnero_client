import { CustomAxiosError } from "../../../@types/global";

function requestHandlerError(error: Error) {
    console.error('Request Error:', error)
    return Promise.reject(`Error in Request ${error.message}`);
    
}

async function responseHandlerError(error: CustomAxiosError) {
    const response = error?.response?.data?.message

    const errObject = {code: 0, msg: ''}

    // Server response with status code 400 or upper and contains message and maybe data object
    if (response) {
        errObject.code = error.response.status
        errObject.msg = response
        console.error(`Axios error code ${error.response.status}`, error.response.data)
        
    } else {
        const errStr = String(error as unknown)
        
        // evaluate if error message not include comma char
        if (!errStr.includes(',')){
            return Promise.reject(error);
        }

        const [codeStr, msgStr] = errStr.split(',')

        // evaluate if error is like {code: number, message: string}
        if (!codeStr.includes(':') || !msgStr.includes(':')){
            return Promise.reject(error);
        }

        const code = Number(codeStr.substring(codeStr.indexOf(':') + 1))
        const msg = msgStr.substring(msgStr.indexOf(':') + 1)

        errObject.code = code
        errObject.msg = msg
    }

    return Promise.reject(`Code: ${errObject.code}, Message: ${errObject.msg}`);
    
}

export { requestHandlerError, responseHandlerError }