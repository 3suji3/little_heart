import React from 'react';
import { Grid, TextField, Button, createTheme, ThemeProvider } from '@mui/material';
import Server from '../utils/API';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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

  const [formData, setFormData] = useState({
    username: '',
    id: '',
    password: '',
    rePassword: '',
  });
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  
  const handleSignUp = async () => {
    const { username, id, password, rePassword } = formData;
  
    if (!username || !id || !password || !rePassword) {
      alert('모든 필드를 채워주세요.');
      return;
    }
  
    if (password !== rePassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
  
    try {
      // 중복된 ID 확인
      const response = await Server.get('/users');
      const users = response.data;
  
      if (users.some((user) => user.id === id)) {
        alert('이미 존재하는 아이디입니다.');
        return;
      }
  
      // 새 사용자 추가
      await Server.post('/users', { username, id, password });
      alert('회원가입 성공!');
      navigate('/auth/login');
    } catch (error) {
      console.error('회원가입 오류:', error.message);
      alert('회원가입 요청 중 문제가 발생했습니다.');
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
            id='username'
            value={formData.username} 
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '20px', width: '25rem' }}
            color="primary" 
          />
          <TextField
            label="아이디"
            variant="outlined"
            id="id"
            value={formData.id} 
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '20px', width: '25rem' }}
            color="primary" 
          />
          <TextField
            label="비밀번호"
            type="password"
            value={formData.password} 
            onChange={handleInputChange}
            variant="outlined"
            id='password'
            style={{ marginBottom: '24px', width: '25rem' }}
            color="primary"
          />
          <TextField
            label="비밀번호확인"
            type="password"
            value={formData.rePassword} 
            onChange={handleInputChange}
            id='rePassword'
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
            onClick={handleSignUp}
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