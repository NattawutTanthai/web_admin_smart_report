import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../assets/images/logo_smart_report.png';
import Axios from '../../constants/axiosConfig';
import { useNavigate, Link } from "react-router-dom";
import { Backdrop, CircularProgress } from '@mui/material';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Smart report
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    Axios.post('/admin/login', {
      username: data.get('username'),
      password: data.get('password')
    })
      .then((res) => {
        console.log(res)
        alert('เข้าสู่ระบบสำเร็จ!');
        setLoading(false);
        navigate('/Dashborad/MainPage');
      })
      .catch((err) => {
        console.error(err)
      })
  };

  return (
    <ThemeProvider theme={theme}>
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
          <img src={logo} alt="LOGO" width={400} />
          <Typography component="h1" variant="h5">
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
            />
            {/* <Link to="/"> */}
            <Button
              type='submit'
              fullWidth
              variant="contained"
              color='warning'
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            {/* </Link> */}
          </Box>
        </Box>
      </Container>
      <Copyright />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}