import { MainHeader } from "../../components/header/main.header"
import { SettingsIcon } from "../../lib/icons/main.icons"


export const SettingPage = (): JSX.Element => {

    return (
        <section className="w-full py-4 px-3 flex flex-col gap-y-7 justify-items-center items-start">
            <MainHeader title="Ajustes del Sistema" icon={SettingsIcon} />
            <section className="bg-prim-100 flex flex-col p-4 gap-y-4 w-full items-center justify-items-center antialiased">
                
            </section>
        </section>
    )
}