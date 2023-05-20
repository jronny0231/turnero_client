import { TodaySchedule } from '../../../services/schedule.data'

interface scheduleTableType{
  id: number,
  nombres: string,
  referido: string,
  servicio: string
}

function createData(
  id: number,
  nombres: string,
  referido: string,
  servicio: string,
) {
  return { id, nombres, referido, servicio };
}

const rows: scheduleTableType[] = TodaySchedule.data.map((row) => {
  return createData(row[0], row[1], row[2], row[3])
})


import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', type: 'number', width: 1 },
  { field: 'nombres', headerName: 'Nombre Completo', sortable: false, width: 150 },
  { field: 'referido', headerName: 'Referido Por', width: 220 },
  { field: 'servicio', headerName: 'Servicio', type: 'number', width: 200 },
];


export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
          console.log(selectedRowsData);
        }}
      />
    </div>
  );
}