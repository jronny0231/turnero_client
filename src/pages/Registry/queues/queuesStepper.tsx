import * as React from 'react';
import {Box, Stepper, Step, StepLabel, Button, Typography} from '@mui/material';
import { Container, CssBaseline, Grid} from '@mui/material';
import { CardHeader } from './cardHeader.shared';

const steps = ['Numero de identificacion', 'Categoria de servicio', 'Subcategoria'];

export default function MainQueueStepper() {

  const [activeStep, setActiveStep] = React.useState(0);


  const handleNext = () => {
    // Evaluar si el estado del paso anterior esta completado.
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    // Resetear el estado de la seleccion actual
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Grid component="div" container spacing={2} direction="row" display={'flex'} alignItems="center" justifyContent={"center"}>
          <Grid component="div" item md={4} sm={12} >
              <CardHeader tittle="BIENVENIDO AL SISTEMA DE TURNOS"
                  subtittle="INGRESE SU DOCUMENTO DE IDENTIDAD PARA CONTINUAR"/>
          </Grid>
          
          <Grid component="div" item md={8} sm={12} >
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};

                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>

              
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />

                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
  
  );
}