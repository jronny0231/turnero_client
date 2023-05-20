import { Container, CssBaseline, Grid } from "@mui/material";
import { CardHeader } from "./cardHeader.shared";
import { useQueueInputState } from "./hooks/queueInput.hook";
import QueueInputComponent from "./queueInputComponent";
import CategorySection from "./categorySection";
import SubCategorySection from "./subCategorySection";

export default function MainQueues() {
    const {active} = useQueueInputState();

    return (
        <Container component="div">
            <CssBaseline />
            <Grid component="div"
                container spacing={2}
                direction="row"
                display={'flex'}
                alignItems="center"
                justifyContent={"center"}
            >
                <Grid component="div" item md={4} sm={12} >
                    <CardHeader title={active.title} subtitle={active.subtitle}/>
                </Grid>
                <Grid component="div" item md={8} sm={12} >
                    {active.step === 0 ? <QueueInputComponent /> :
                    active.step === 1 ? <CategorySection /> : <SubCategorySection />}
                </Grid>
            </Grid>
        </Container>
    );
} 