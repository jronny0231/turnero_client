import { MainHeader } from "../components/header/main.header"
import { QueueIcon } from "../lib/icons/app.icons"

export const RegistryPage = (): JSX.Element => {

    return (
        <section className="w-full py-4 px-3 flex flex-col gap-y-7 justify-items-center items-start">
            <MainHeader title="Registro de Turno" icon={QueueIcon} />
            <section className="bg-prim-100 flex flex-col p-4 gap-y-4 w-full items-center justify-items-center antialiased">
                
            </section>
        </section>
    )
}