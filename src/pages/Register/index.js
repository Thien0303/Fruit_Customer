import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Logo from '../../assets/images/logo.png'

const defaultTheme = createTheme()
export default function Register() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [momo, setMomo] = React.useState(null);
    const [profile, setProfile] = React.useState(null);
    const navigate = useNavigate();
    const baseUrl = 'https://fruitseasonapims-001-site1.btempurl.com/api/auths/register';

    const handleFileUpload = (event, fileNumber) => {
        const files = event.target.files;
        if (files.length > 0) {
            if (fileNumber === 1) {
                setMomo(files[0]);
            } else if (fileNumber === 2) {
                setProfile(files[0]);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('Email', email);
            formData.append('Password', password);
            formData.append('FullName', name);
            formData.append('Address', address);
            formData.append('PhoneNumber', phone);
            formData.append('RoleId', 3);
            if (momo) {
                formData.append('ImageMomoUrl', momo);
            }
            if (profile) {
                formData.append('ProfileImageUrl', profile);
            }

            const response = await fetch(baseUrl, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/login');
            } else {
                console.log('Registration failed');
            }
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://wallpapercave.com/wp/wp3145246.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography color={'goldenrod'} variant="h6" component="div">
                            <img src={Logo} alt="logo" height={'40'} width="170" />
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="fullName"
                                label="Full Name"
                                type="text"
                                id="fullName"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="phone"
                                label="Phone number"
                                type="tel"
                                id="phone"
                                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="address"
                                label="Address"
                                type="text"
                                id="address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <span>Momo Image</span><input class="form-control form-control-sm" id="Momo" type="file" onChange={(e) => handleFileUpload(e, 1)} placeholder='Momo image'></input>
                            <span>Profile Image</span><input class="form-control form-control-sm" id="Profile" type="file" onChange={(e) => handleFileUpload(e, 2)}></input>
                            {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 1 }}
                            >
                                Register
                            </Button>

                            {/* <Copyright sx={{ mt: 5 }} /> */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}
