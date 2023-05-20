import { ArrowBack } from "@mui/icons-material";
import { Grid, Container, Button, Skeleton} from "@mui/material";
import React from "react";
import { useQueueInputState } from "./hooks/queueInput.hook";
import styled from "@emotion/styled";
import { Response, ServicesGroup, getServicesGroup } from "../../../services/services.data";
import Swal from "sweetalert2";

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

    const {active, setActive, setCategory} = useQueueInputState();
    const [buttons, setButtons] = React.useState<JSX.Element[]>(
        Array.from(Array(4).keys()).map((e) => 
            <Skeleton
                key={e}
                animation="wave"
                variant="rectangular"
                width={'100%'}
                height={54} />
            )
    );

    const handlerBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActive({...active, step: active.step - 1});
    }

    const handleSetCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const {value, innerText, style} = e.currentTarget;

        setCategory({id: + value, name: innerText, color: style.backgroundColor})

        setActive({...active, step: 2, title: innerText});
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const categories: Response<ServicesGroup[]> | undefined = await getServicesGroup();
            if(categories && categories.success && categories.data){
                setButtons(categories.data.map((cat: ServicesGroup) => {
                    return (
                        <BigButton
                            key={'cat_' + cat.id}
                            style={{backgroundColor: `#${cat.color_hex}`}}
                            value={cat.id}
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={handleSetCategory}
                        >
                                {cat.descripcion}
                        </BigButton>
                    )
                }))
            } else {
                Swal.fire(
                    "Error obteniendo los datos",
                    categories?.message,
                    "error"
                )

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