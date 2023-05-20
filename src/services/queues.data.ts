import { Path } from "./utils/axios.const";
import { authRequest } from "./utils/api.request";
import { InputQueues, Ticket, Response } from "../types";

export const createQueue = async (queue: InputQueues): Promise< Response<Ticket | undefined>> => {

    try{
        const resp: Response<Ticket> = await authRequest.post(Path.QUEUES, queue);
        console.log({resp})
        return {
                success: true,
                message: resp.message,
                data: resp.data,
        }
    } catch (error) {
        return Promise.reject(
            {
                success: false,
                message: `Error intentando crear nu nuevo ticket: ${error}`,
            }
        )
    }
}