import { SpinnerIcon } from "../../../../../lib/icons/helper.icons"

export const LoadingTag = () => {
    return (
        <div className="flex flex-row justify-center items-center gap-4 w-full py-2 bg-prim-700 text-white">
            <span className="animate-spin"><SpinnerIcon /></span>
            <p>Cargando...</p>
        </div>
    )
}