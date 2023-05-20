import React from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

import img500 from '../../assets/error500.jpg';

export default function InternalServerError({title}: {title: string}): JSX.Element {

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
              image={img500}
              alt="500 internal server error"
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {title !== '' ? title : 'Error Interno del Servidor'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                El sistema no ha podido comunicarse con el servidor, el fallo puede deberse
                a una caida del servicio o problemas de conexion, favor contacte a un administrador.
                Reintente la solicutud en unos minutos.
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" onClick={handleClick}>Reintentar</Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </Container>
    </Box>
  );
}