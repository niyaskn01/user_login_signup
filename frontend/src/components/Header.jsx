import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/store';
import toast from 'react-hot-toast';

function Header() {
  const {userID,token}=useSelector(state=>state.userData)
  const dispatch=useDispatch()
  const handleLogout=()=>{
    dispatch(clearUser())
    localStorage.removeItem('userData')
    setTimeout(() => {
      toast.success('logout successfull')
    }, 400);
  }


  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Your App Name
        </Typography>
        <div>
        {
          !userID && !token ? 
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Sign Up
            </Button>
          </>
          :
          <>
            <Button color="inherit" onClick={handleLogout} component={Link} to="/login">
              Log out
            </Button>
          </>
        }
          
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
