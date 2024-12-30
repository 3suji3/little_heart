import React from 'react';
import Header from "../components/Header";
import { Box, Typography, Grid } from "@mui/material";
import { useEffect, useState } from 'react';

const Today = () => {
  const [username, setUsername] = useState('사용자'); 

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  return (
    <>
      <Header />

      <Grid
        container
        direction="column"
        alignItems="center"
        style={{
          marginTop: '40px',
          padding: '20px',
        }}
      >
        <Box display={'flex'}>
          <Typography
            variant='h5'
            style={{
              color: '#5FB079',
              fontWeight: 'bold',
              marginBottom: '20px',
            }}
          >
          {username}
          </Typography>
          <Typography
            variant="h5"
            style={{
              color: '#7EDC9C',
              marginBottom: '20px',
            }}
          >
            님에게 추천하고픈 오늘의 명언
          </Typography>
        </Box>

        <Box
          style={{
            border: '1px solid #7EDC9C',
            borderRadius: '10px',
            padding: '20px',
            width: '50%',
            height: '248px',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body1"
            style={{
              color: '#5FB079',
              fontSize: '1.2rem',
              marginBottom: '10px',
            }}
          >
            “나만이 내 인생을 바꿀 수 있다. 아무도 날 대신해 해줄 수 없다.”
          </Typography>
          <Typography
            variant="body2"
            style={{
              color: '#7EDC9C',
              fontSize: '1rem',
            }}
          >
            영화 배우 - 캐롤 버넷
          </Typography>
        </Box>

        <Box
          style={{
            marginTop: '50px',
          }}
        >
          <img src="/img/clover.png" alt="클로버" style={{ height: '160px', marginLeft: '1200px'}}
          />
        </Box>
      </Grid>
    </>
  );
};

export default Today;
