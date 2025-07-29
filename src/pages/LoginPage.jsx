import React from 'react';
import { Grid, TextField, Button, createTheme, ThemeProvider } from '@mui/material';
import Server from '../utils/API';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './css/LoginPage.css';

// 커스텀 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: '#7EDC9C', 
    },
  },
});

const LoginPage = () => {
  const navigate = useNavigate();

  const [formLoginData, setFormLoginData] = useState({
    id: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = async () => {
    const { id, password } = formLoginData;
  
    if (!id || !password) {
      alert('모든 필드를 채워주세요.');
      return;
    }
  
    try {
      // JSON Server에서 모든 사용자 데이터를 가져옴
      const response = await Server.get('/users');
      const users = response.data;
  
      // 사용자 검증
      const user = users.find((user) => user.id === id && user.password === password);
  
      if (user) {
        alert(`${user.username}님 환영합니다.`);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/today', { state: { username: user.username } });
      } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (error) {
      console.error('로그인 오류:', error.message);
      alert('로그인 요청 중 문제가 발생했습니다.');
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container style={{ height: '100vh' }}>
        <Grid item xs={4}>
          <img
            src="/img/background.png"
            alt="Background"
            style={{ width: '100%', height: '100%' }}
            className="login_img"
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
            label="아이디"
            id="id"
            variant="outlined"
            value={formLoginData.id} 
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '20px', width: '25rem' }}
            color="primary" 
          />
          <TextField
            label="비밀번호"
            id="password"
            type="password"
            value={formLoginData.password} 
            onChange={handleInputChange}
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
            onClick={handleLogin}
          >
            로그인
          </Button>
        </Grid>
        <Grid item xs={4}>
          <img
            src="/img/background.png"
            alt="Background"
            style={{ width: '100%', height: '100%' }}
            className="login_img"
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;
