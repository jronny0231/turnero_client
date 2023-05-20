
export type stateType = string | object | null;

export const setLocalStorage = (key: string, value: stateType): boolean => {
    try {
        switch(true){
            case value === null:
                window.localStorage.removeItem(key)
                return true

            case typeof value === 'string':
                window.localStorage.setItem(key, String(value))
                return true

            case typeof value === 'object':
                window.localStorage.setItem(key, JSON.stringify(value))
                return true

        }
    } catch (err) {
        console.error({error_set_local_storage: {
            key,
            value,
            err
        }})
    }

    return false
}

export const getLocalStorage = (key: string): object | string | null => {
    const value: string|null = window.localStorage.getItem(key);
    if (value) {
        try{
            return JSON.parse(value) as object;
        
        } catch(error){
            return value as string;
        }
    }

    return null
}