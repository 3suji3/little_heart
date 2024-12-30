import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // 활성화된 버튼 ID를 저장하는 상태
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (buttonId, path) => {
    // 클릭된 버튼을 활성화 상태로 설정
    setActiveButton(buttonId);

    // 페이지 이동
    navigate(path);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      style={{
        height: '80px',
        padding: '0 20px',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <Box>
        <img src="/img/LOGO.png" alt="로고" height="44px" />
      </Box>

      <Grid item>
        <Box display="flex" alignItems="center" gap={24}>
          <Button
            style={{
              fontSize: '1.4rem',
              color: activeButton === 'today' ? '#5FB079' : '#7EDC9C',
              backgroundColor: '#fff',
              textTransform: 'none',
              fontFamily: '"Jua", serif',
              textDecoration: activeButton === 'today' ? 'underline' : 'none',
              position: 'relative',
            }}
            onMouseOver={(e) => {
              if (activeButton !== 'today') {
                e.target.style.textDecoration = 'underline';
                e.target.style.backgroundColor = '#fff';
                e.target.style.color = '#5FB079';
              }
            }}
            onMouseOut={(e) => {
              if (activeButton !== 'today') {
                e.target.style.textDecoration = 'none';
                e.target.style.color = '#7EDC9C';
                e.target.style.backgroundColor = 'transparent';
              }
            }}
            onClick={() => handleButtonClick('today', '/today')}
          >
            명언
          </Button>

          <Button
            style={{
              fontSize: '1.4rem',
              color: activeButton === 'write' ? '#5FB079' : '#7EDC9C',
              backgroundColor: '#fff',
              textTransform: 'none',
              fontFamily: '"Jua", serif',
              textDecoration: activeButton === 'write' ? 'underline' : 'none',
              position: 'relative',
            }}
            onMouseOver={(e) => {
              if (activeButton !== 'write') {
                e.target.style.textDecoration = 'underline';
                e.target.style.backgroundColor = '#fff';
                e.target.style.color = '#5FB079';
              }
            }}
            onMouseOut={(e) => {
              if (activeButton !== 'write') {
                e.target.style.textDecoration = 'none';
                e.target.style.color = '#7EDC9C';
                e.target.style.backgroundColor = 'transparent';
              }
            }}
            onClick={() => handleButtonClick('write', '/write')}
          >
            일기 쓰기
          </Button>
        </Box>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          style={{
            backgroundColor: '#BEEDCD',
            color: '#7EDC9C',
            textTransform: 'none',
            fontFamily: '"Jua", serif',
            borderRadius: '16px',
            padding: '6px 16px',
            fontSize: '1.1rem',
            width: '120px',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#7EDC9C';
            e.target.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#BEEDCD';
            e.target.style.color = '#7EDC9C';
          }}
        >
          로그아웃
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
