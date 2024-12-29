import React from 'react';
import { Grid, TextField, Button, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './css/SignupPage.css'

// 커스텀 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: '#7EDC9C', 
    },
  },
});

const SignupPage = () => {
  const navigate = useNavigate()

  const handleLoginPage = () => {
    navigate('/auth/login');
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container style={{ height: '100vh' }}>
        <Grid item xs={4}>
          <img
            src="/img/background.png"
            alt="Background"
            style={{ width: '100%', height: '100%' }}
            className="signup_img"
          />
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="/img/LOGO.png"
            alt="Logo"
            style={{ width: '200px', marginBottom: '30px' }}
          />
          <TextField
            label="이름"
            variant="outlined"
            fullWidth
            style={{ marginBottom: '20px', width: '25rem' }}
            color="primary" 
          />
          <TextField
            label="아이디"
            variant="outlined"
            fullWidth
            style={{ marginBottom: '20px', width: '25rem' }}
            color="primary" 
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            style={{ marginBottom: '24px', width: '25rem' }}
            color="primary"
          />
          <TextField
            label="비밀번호확인"
            type="password"
            variant="outlined"
            style={{ marginBottom: '24px', width: '25rem' }}
            color="primary"
          />
          <Button 
            variant="contained" 
            color="primary" 
            style={{
              width: '25rem', 
              height: '3rem', 
              fontSize: '1.4rem', 
              fontFamily: '"Jua", serif', 
              backgroundColor: '#BEEDCD', 
              color: '#7EDC9C'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#7EDC9C';
              e.target.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#BEEDCD';
              e.target.style.color = '#7EDC9C';
            }}
            onClick={handleLoginPage}
            >
            회원가입
          </Button>
        </Grid>
        <Grid item xs={4}>
          <img
            src="/img/background.png"
            alt="Background"
            style={{ width: '100%', height: '100%' }}
            className="signup_img"
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignupPage