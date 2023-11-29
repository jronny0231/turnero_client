import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ERRORS = {
    'BAD REQUEST': {
        status: 400,
        msg: "The request send has errors.",
    },
    'UNAUTHORIZED': {
        status: 401,
        msg: "You must need to be logged in.",
    },
    'FORBIDDEN': {
        status: 403,
        msg: "You dont have permissions to '#location'.",
    },
    'PAGE NOT FOUND': {
        status: 404,
        msg: "The resource: '#location' not exists.",
    },
    'SERVER ERROR': {
        status: 500,
        msg: "Internal Server Error.",
    }
}

type ErrorPage = {
    type: keyof typeof ERRORS
    message?: React.ReactNode
    action?: {
        fn: ((args?: unknown) => unknown) | void
        name: string
    }
}

export const ErrorPage = ({ type, message, action }: ErrorPage): React.ReactElement => {

    const location = useLocation();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<typeof message>(message)

    const title = `ERROR ${ERRORS[type].status} | ${type}`;

    useEffect(() => {
        document.title = title

        if (message === undefined)
            setErrorMsg(ERRORS[type].msg.replace("#location", location.pathname))

    }, [title, type, message, location.pathname])

    return (
        <section className="flex flex-col place-content-center h-screen text-center gap-4 bg-gradient-to-br from-prim-800 to-blue-900">
            <h1 className="uppercase font-sans text-4xl opacity-40 text-cyan-100 tracking-wider antialiased hover:subpixel-antialiased">
                {title}
            </h1>
            <div className="uppercase py-1 font-sans text-md font-semibold bg-gradient-to-r from-prim-600 to-blue-600 text-prim-50">
                <span>
                    {errorMsg}
                </span>
                <button className="ml-2 px-1 border-2"
                    onClick={() => action?.fn ?? navigate(-1)}>
                        {action?.name ?? 'Go Back!'}
                </button>
            </div>
        </section>
    )
}