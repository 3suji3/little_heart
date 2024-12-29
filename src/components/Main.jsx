import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth/login');
  };

  const handleSignup = () => {
    navigate('/auth/signup');
  }

  return (
    <Grid container style={{ height: '100vh', overflow: 'hidden' }} direction="column">
      <Grid item style={{ height: '25%', backgroundImage: "url('/img/background.png')", backgroundSize: 'cover' }} />

      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ flex: 1, backgroundColor: '#fff' }}
      >
        <Box>
          <img src="/img/LOGO.png" alt="logo" style={{ width: '200px', marginBottom: '20px' }} />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Button
            variant="contained"
            style={{
              width: '300px',
              height: '44px',
              borderRadius: '16px',
              backgroundColor: '#BEEDCD',
              color: '#7EDC9C',
              fontSize: '1.4rem',
              fontFamily: '"Jua", serif',
              marginBottom: '16px',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#7EDC9C';
              e.target.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#BEEDCD';
              e.target.style.color = '#7EDC9C';
            }}
            onClick={handleLogin}
          >
            로그인
          </Button>
          <Button
            variant="contained"
            style={{
              width: '300px',
              height: '44px',
              borderRadius: '16px',
              backgroundColor: '#BEEDCD',
              color: '#7EDC9C',
              fontSize: '1.4rem',
              fontFamily: '"Jua", serif',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#7EDC9C';
              e.target.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#BEEDCD';
              e.target.style.color = '#7EDC9C';
            }}
            onClick={handleSignup}
          >
            회원가입
          </Button>
        </Box>
      </Grid>

      <Grid item style={{ height: '25%', backgroundImage: "url('/img/background.png')", backgroundSize: 'cover' }} />
    </Grid>
  );
};

export default Main;
