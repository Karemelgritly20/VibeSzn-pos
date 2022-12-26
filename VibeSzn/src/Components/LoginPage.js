import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "../Styles/loginpage.css"



function LoginPage() {
  return (
    <div className='login-container'>
        <div className='login-div'>
         <Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <>
        <img src="./loginlogo.png"/>
      </>
      
      <Box component="form" noValidate  sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Remember Me"
            />
          </Grid>
          <Grid item xs={6} sx={{marginTop:"10px"}}>
            <Link>
                Forgot Password?
            </Link>
          </Grid>
        </Grid>
        <Button
        
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 , textTransform:"capitalize" , width:"80%",}}
          href="/storeselection"
        >
          Sign In
        </Button>
        <Grid container justifyContent="flex-end">
          
        </Grid>
      </Box>
    </Box>
    
  </Container>
  </div>
  {/* <Copyright sx={{ mt: 5 }} /> */}
<Typography sx={{color:"white" ,fontFamily:"itc book"}}>WEBSITE BY AIOBO</Typography>
<Typography sx={{color:"white" ,fontFamily:"itc book"}}>© 2022 All RIGHT RESERVED</Typography>

  </div>
  )
}

export default LoginPage;