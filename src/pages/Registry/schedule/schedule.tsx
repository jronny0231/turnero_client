import DataTable from '../queues/table.shared';
import { Box, Grid } from '@mui/material';

export default function MainSchedule() {
  return (
    <Box maxWidth={"md"}
      sx={{
        minHeight: '400px',
      }}
    >
        <Grid sx={{
            backgroundColor: 'rgba(200, 230, 255, 0.8)',
            minHeight: '1vh',
            margin: '10px 0',
            padding: '5px'}}    
        >
          
        </Grid>
        <DataTable />
    </Box>
  );
}