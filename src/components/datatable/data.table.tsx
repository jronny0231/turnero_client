import { SimpleTable } from './lib/components/main.table';
import { Props } from './lib/@types/main';
import { buttons } from './lib/components/action.btn';
import { LoadingTag } from './lib/components/utils/loading.tag';
import { ErrorTag } from './lib/components/utils/error.tag';
import { useDataTable } from './lib/hooks/useDataTable';
import { useEffect } from 'react';
//import { useReactTable } from "@tanstack/react-table"


export const DataTable = (props: Props) => {

    const { isLoading, hasErrors, data, setProps } = useDataTable()

    useEffect(() => {
        setProps(props)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    return (
        <div className="flex flex-col w-full min-h-max shadow-prim-${CONTRAST.hover} shadow-lg border-prim-400">
            {isLoading && <LoadingTag />}
            {hasErrors && <ErrorTag />}
            {!isLoading && !hasErrors && <>
                <SimpleTable columns={props.columns} data={data} actions={buttons} />
                <footer className="sticky bottom-0 w-full py-2 bg-prim-700 text-white text-center">
                    <span>Total: <b>{data.length.toLocaleString('es-DO')}</b></span>
                </footer>
            </>
            }

        </div>
    )
}