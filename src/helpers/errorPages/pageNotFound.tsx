import React from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

import img404 from '../../assets/error404.jpg';

export default function PageNotFound({title}: {title?: string}): JSX.Element {

    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate(-1)
        console.log(event);
    }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#7aaced',
        margin: 0,
      }}
    >
      <Container maxWidth="xs">
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea component="a">
            <CardMedia
              component="img"
              width="20vw"
              image={img404}
              alt="404 page not found"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {title ? title : 'Pagina no encontrada'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                El recurso al que estas intentando acceder no existe o no se encuentra dosponible,
                intente entrar mas adelante o pongase en contacto con el administrador si es un error.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={handleClick}>Regresar</Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </Container>
    </Box>
  );
}