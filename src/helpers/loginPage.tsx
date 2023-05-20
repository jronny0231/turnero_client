import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import z from 'zod';
import Swal from 'sweetalert2';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../hooks/auth.hooks';
import LoadingCustomButton from '../pages/shared/buttons/loading';


export default function SignIn(): JSX.Element {

  const {login} = useAuth();

  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);


  type ErrorsType = {
    username: string[] | undefined,
    password: string[] | undefined,

  }

  const [errors, setErrors] = React.useState<ErrorsType>({
    username: undefined,
    password: undefined,
  })

  const loginValidation = z.object({
    username: z.string({
                  required_error: "Nombre de usuario es requerido",
                  invalid_type_error: "El nombre de usuario debe contener letras",
                }).min(6, "El nombre de usuario debe contener al menos 6 caracteres"),

    password: z.string({
                  required_error: "La contraseña es requerida",
                  invalid_type_error: "La contraseña debe contener letras",
                }).min(8, "La contraseña debe contener al menos 8 caracteres"),
  }).safeParse(credentials);

  React.useEffect(() => {
    document.title = "Login Page";


    if(loginValidation.success === false) {
      const errors = loginValidation.error.format();

      setErrors({
        username: errors.username?._errors,
        password: errors.password?._errors,
      });
      return        
    }
    setErrors({
      username: undefined,
      password: undefined,
    });

  }, [credentials])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({
    ...credentials,
      [name]: value,
    });
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword); 


  const handleSubmit = async () => {

    if(errors.username || errors.password){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Tiene errores sin resolver en los campos.',
        timer: 5000
      })
      return;
    }

    return login(credentials);

  };

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesion
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de Usuario"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleChange}
            />
            {errors.username ? (
              <ul>
                {errors.username.map((error) => (
                  <li style={{color: 'red'}} key={error}>{error}</li>
                ))}
              </ul>
            ) : ''}
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              id="password"
              label="Contraseña"
              type={showPassword ? "text" : "password"} // <-- This is where the magic happens
              onChange={handleChange}
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {errors.password ? (
              <ul>
                {errors.password.map((error) => (
                  <li style={{color: 'red'}} key={error}>{error}</li>
                ))}
              </ul>
            ) : ''}
            
            <LoadingCustomButton
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Entrar
            </LoadingCustomButton>
          </Box>
        </Box>
      </Container>
  );
}