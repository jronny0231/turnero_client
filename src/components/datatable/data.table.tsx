import { SimpleTable } from './lib/components/main.table';
import { StateType } from './lib/@types/main';
import { buttons } from './lib/components/action.btn';
import { LoadingTag } from './lib/components/utils/loading.tag';
import { ErrorTag } from './lib/components/utils/error.tag';


export const DataTable = ({state: {columns, data, isLoading, hasErrors}}: {state: StateType}) => {

    return (
        <div className="flex flex-col w-full min-h-max shadow-prim-${CONTRAST.hover} shadow-lg border-prim-400">
            {isLoading && <LoadingTag />}
            {hasErrors && <ErrorTag />}
            {!isLoading && !hasErrors && <>
                <SimpleTable columns={columns} data={data} actions={buttons} />
                <footer className="sticky bottom-0 w-full py-2 bg-prim-700 text-white text-center">
                    <span>Total: <b>{data.length.toLocaleString('es-DO')}</b></span>
                </footer>
            </>
            }

        </div>
    )
}