import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Button, Container, CssBaseline, TextField, Typography, styled, IconButton, InputAdornment  } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axiosInstance from '../axios/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';


const Paper = styled('div')({
  marginTop: theme => theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Form = styled('form')({
  width: '100%',
  marginTop: theme => theme.spacing(1),
});

const SubmitButton = styled(Button)({
  margin: theme => theme.spacing(3, 0, 2),
});

function Register() {
 
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [name,setName]=useState('')
const [showPassword, setShowPassword] = useState(false);
const {userID,token}=useSelector(state=>state.userData)
const navigate=useNavigate()

//login function
const handleSubmit=async(e)=>{
  e.preventDefault()
  const userData={name,email,password}
  try {
    const {data}=await axiosInstance.post('/user/register',userData)

    if(data.success){
      navigate('/')
      const userInfo={
        userID:data.user._id,
        token:data.token
      }

      localStorage.setItem('userData',JSON.stringify(userInfo))
      
      setTimeout(() => {
        toast.success(data.message)
      }, 500);
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error);
  }
}

const handlePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

useEffect(()=>{
  if(userID && token){
    navigate('/')
  }
},[])

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Form>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="name"
              autoComplete="username"
              autoFocus
              onChange={(e)=>setName(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="emial"
              label="Email"
              name="email"
              autoComplete="username"
              autoFocus
              onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handlePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Login 
            </SubmitButton>
          </Form>
        </Paper>
      </Container>
    </Layout>
  );
}


export default Register