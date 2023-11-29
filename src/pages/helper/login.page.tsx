import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputPassword, InputText } from "../../components/low/input";
import { userCredential, userCredentialType } from "../../helpers/schemas/user.schema";
import { toast } from 'sonner'
import { useAuthHook } from '../../hooks/auth.hook'
import { useState } from "react";
import { Button } from "../../components/low/button";
import { useSEO } from "../../hooks/useSEO";

export const LoginPage = (): React.ReactElement => {

    useSEO({title: 'Inicie sesion'})

    const { register, handleSubmit, formState: { errors }, } = useForm<userCredentialType>({
        resolver: zodResolver(userCredential),
    });

    const { login } = useAuthHook()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit: SubmitHandler<userCredentialType> = async (data) => {
        setIsLoading(true)
        try {
            await login(data)
        } catch (error) {
            console.error(error)
            toast.error('Error trying login')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="grid place-content-center h-screen bg-stone-100">
            <form className="flex flex-col gap-3 w-screen md:w-96 shadow-lg bg-white p-5" onSubmit={handleSubmit(onSubmit)}>
                <header className="flex flex-col justify-around content-center items-center border-2">
                    <img src="/brand.png" alt="Brand Logo" className="w-56" />
                    <h1 className="text-2xl py-5 text-slate-800 uppercase tracking-widest">Inicie Sesion</h1>
                </header>
                <main>
                    <InputText
                        title="Nombre de Usuario"
                        placeholder="Escriba su nombre de usuario"
                        validations={errors.username?.message !== undefined ? [errors.username.message] : undefined}
                        {...register("username")}
                    />
                    <InputPassword
                        title="Contraseña"
                        placeholder="Escriba su contraseña"
                        validations={errors.password?.message !== undefined ? [errors.password.message] : undefined}
                        {...register("password")}
                    />
                </main>
                <footer className="flex flex-row justify-around gap-10">
                    <Button type="reset" bussy={isLoading}>Limpiar campos</Button>
                    <Button type="submit" bussy={isLoading}>Entrar</Button>
                </footer>
            </form>
        </section>
    )
}