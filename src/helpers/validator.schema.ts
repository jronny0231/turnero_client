import { AnyZodObject, ZodError } from "zod";

type result = {[k: string]: string[]}

export const validate = <T>(data: T) => (schema: AnyZodObject): true | result | unknown => {

    try {
        schema.parse(data)
        return true

    } catch (error) {
        if (error instanceof ZodError) {
            const result: result = {};
            error.issues.forEach((issue) => {
                const key = String(issue.path)
                const msg = String(issue.message)
                if (result[key] === undefined) {
                    return result[key] = [msg]
                }
                if (result[key].length > 0) {
                    return result[key].push(msg)
                }
            })

            return result as result
        }

        return error
    }

}