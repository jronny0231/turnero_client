import { styled } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Container, Tab } from "@mui/material";
import { inputRef, inputRefType, useQueueInputState } from './hooks/queueInput.hook';
import { QueueInputPanel } from './queueInputPanel';

interface StyledTabProps {
    label: string;
    value: string;
}

const OptionTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: 'bold',
      letterSpacing: 2,
      marginRight: theme.spacing(1),
      color: '#1890ff',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&.Mui-selected': {
        color: '#ffff',
        background: '#1890ff',
        transition: '0.5s all ease',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
      },
    }),
  );

export default function QueueInputComponent(): JSX.Element {

    const {active, setActive, resetDocument} = useQueueInputState();

    const handleChange = (event: React.SyntheticEvent, refName: string) => {
        const ref: inputRefType = inputRef.filter((ref) => ref.name === refName )[0];
        setActive({...active, ref});
        resetDocument();
    };
    
    return (
        <TabContext value={active.ref.name}>
            <Container sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="queueOptionTab" centered>
                  {inputRef.map((ref) => 
                      <OptionTab key={ref.id} label={ref.name.toUpperCase()} value={ref.name} />
                  )}
                </TabList>
            </Container>
            <Container style={{alignItems:'center', justifyItems: 'center'}}>
                <TabPanel value={active.ref.name}>
                  <QueueInputPanel />
                </TabPanel>
            </Container>
        </TabContext>
    )
}