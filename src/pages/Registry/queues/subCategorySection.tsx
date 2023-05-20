import { ArrowBack } from "@mui/icons-material";
import { Grid, Container, Button, Skeleton} from "@mui/material";
import React from "react";
import { useQueueInputState } from "./hooks/queueInput.hook";
import styled from "@emotion/styled";
import { Response, Services, getServicesByGroup } from "../../../services/services.data";
import { createQueue } from "../../../services/queues.data";
import Swal from "sweetalert2";
import { Ticket } from "../../../types";

const BigButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'uppercase',
    fontSize: 16,
    padding: '12px 24px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
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
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });

/**
 * Esta pantalla cargara el CardHeader solo con el titulo,
 * tendra en una grid de dos columnas las categorias
 */
export default function CategorySection(): JSX.Element {

    const {document, active, checked, setActive, setCategory, category, setSubcategory, resetAll} = useQueueInputState();
    const [buttons, setButtons] = React.useState<JSX.Element[]>(
        Array.from(Array(6).keys()).map((e) => 
            <Skeleton
                key={e}
                animation="wave"
                variant="rectangular"
                width={'100%'}height={48} /> ) 
    );

    const handlerBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCategory(null);
        setActive({...active, step: active.step - 1});
    }

    const handleSetSubCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const {value, innerText} = e.currentTarget;

        setSubcategory({id: + value, name: innerText})

        // Send post with state values and get ticket
        createQueue({

            tipo_identificacion_id: active.ref.id,
            identificacion: document,
            es_tutor: checked,
            servicio_destino_id: Number(value)})

            .then((response) => {
                const ticket: Response<Ticket | undefined> = response
                console.log({ticket})

                if(ticket.success && ticket.data){
                    Swal.fire({
                        icon: 'success',
                        title: `Su turno es ${ticket.data.secuencia_ticket}`,
                        text: 'Turno creado con exito'
                    })
                }

                resetAll();
                
            })
        
    }

    React.useEffect(() => {
        const fetchData = async () => {
            if(category){
                const subcategories: Response<Services[]> | undefined = await getServicesByGroup(category.id);
                if(subcategories && subcategories.success && subcategories.data){
                    const services: Services[] = subcategories.data;
                    setButtons(services.map((serv: Services) => {
                        return (
                            <BigButton
                                key={'serv_' + serv.nombre_corto}
                                style={{backgroundColor: `${category.color}`}}
                                value={serv.id}
                                variant="contained"
                                fullWidth size="large"
                                onClick={handleSetSubCategory}
                            >
                                    {serv.descripcion}
                            </BigButton>
                        )
                    }))
                } else {
                    Swal.fire(
                        "Error obteniendo los datos",
                        subcategories?.message,
                        "error"
                    )

                } 
            }   
        }

        // call the function
        fetchData()
            // make sure to catch any error
            .catch(console.error);
        
    }, [])

    return (
        <Container component={'div'}>
            <Grid container spacing={6} >
                <Grid item xs={12}>
                    <Button variant="contained"  size="small" onClick={handlerBack}>
                        <ArrowBack />
                    </Button>
                </Grid>
                <Grid item container xs={12} spacing={4}>
                    {buttons.map((elem) => {
                        return <Grid key={'gr' + elem.key} item sm={6} xs={12}>
                            {elem}
                        </Grid>
                    })}
                </Grid>
            </Grid>
        </Container>
    );
}       