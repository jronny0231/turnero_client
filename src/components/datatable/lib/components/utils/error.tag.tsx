import { DangerIcon } from "../../../../../lib/icons/helper.icons"

export const ErrorTag = () => {
    return (
        <div className="flex flex-row justify-center items-center gap-4 w-full py-2 bg-red-500 text-white">
            <span><DangerIcon /></span>
            <p>Ha habido un error</p>
        </div>
    )
}