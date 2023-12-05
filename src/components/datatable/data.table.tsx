import { useState, useMemo } from 'react';
import { SpinnerIcon } from "../../lib/icons/helper.icons";
import { SimpleTable, TableProps } from './lib/simple.table';
//import { useReactTable } from "@tanstack/react-table"


export const DataTable = ({ columns, data, actions, ...rest }: TableProps) => {

    const [rows, setRows] = useState<typeof data>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useMemo(() => {
        setRows(data)
        setIsLoading(false)
    }, [data])


    const LoadingTag = () => {
        return (
            <div className="flex flex-row justify-center items-center gap-4 w-full py-2 bg-prim-700 text-white">
                <span className="animate-spin"><SpinnerIcon /></span>
                <p>Cargando...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full min-h-max shadow-prim-200 shadow-lg border-prim-400">
            {isLoading === true ? <LoadingTag /> :
                <>
                    <SimpleTable columns={columns} data={rows} actions={actions} {...rest} />
                    <footer className="sticky bottom-0 w-full py-2 bg-prim-700 text-white text-center">
                        <span>Total: <b>{data.length.toLocaleString('es-DO')}</b></span>
                    </footer>
                </>
            }

        </div>
    )
}