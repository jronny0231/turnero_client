import { LoadingButton } from "@mui/lab";
import React from "react";

interface loadingButton  {
    children: React.ReactNode,
    onClick: () => Promise<void>,
    variant?: ("text" | "outlined" | "contained"),
    color?: ("secondary" | "inherit" | "primary" | "success" | "error" | "info" | "warning"),
    startIcon?: React.ReactNode,
    fullWidth?: boolean,
    type?: ("button" | "submit" | "reset" | undefined),
}

export default function LoadingCustomButton(props: loadingButton): JSX.Element {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handlerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setIsLoading(true);
        props.onClick().then(() => {
            setIsLoading(false);
        })
    }

    return (
        <LoadingButton
            {...props}
            onClick={handlerClick}
            loadingPosition={props.startIcon ? "start" : undefined}
            loading={isLoading}
        >
                {props.children}
        </LoadingButton>
    )
}