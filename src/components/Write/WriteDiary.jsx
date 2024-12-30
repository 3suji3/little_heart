import { Box, Grid, Typography, TextField, Button, createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const theme = createTheme({
  palette: {
    primary: {
      main: '#7EDC9C', 
    },
  },
});

const WriteDiary = () => {
  const getNowDate = () => {
    const now = new Date();
    return now.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const navigate = useNavigate()

  const handleEmotionPage = () => {
    navigate('/write/diary/emotion')
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{
          marginTop: "40px",
          marginLeft: "220px",
          width: "1100px",
          height: "580px",
          backgroundColor: "#E4FFED",
          borderRadius: "16px",
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{
            marginTop: "10px",
            width: "1080px",
            height: "560px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "16px",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between" 
            alignItems="center" 
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h4"
              style={{
                color: "#5FB079",
                fontWeight: "bold",
                textAlign: "center", 
                flex: "1", // 공간 균등 분배
              }}
            >
              {getNowDate()}
            </Typography>
          </Box>

          <Box
            borderTop={"3px solid #5FB079"}
            width="100%"
            marginBottom="20px"
          />

          <Box
            display="flex"
            alignItems="center" 
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h6"
              style={{
                color: "#5FB079",
                fontWeight: "bold",
                marginRight: "10px", 
                marginTop: "-30px"
              }}
            >
              제목:
            </Typography>
            <TextField
              id="title"
              fullWidth
              style={{
                color: "#5FB079",
                flex: "1", // 입력 필드가 가로 공간을 채우도록 설정
              }}
              color="primary"
            />
          </Box>
          <Box
            borderTop={"3px solid #5FB079"}
            width="100%"
            marginBottom="20px"
          />
          <Box
            display="flex"
            alignItems="center" 
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="h6"
              style={{
                color: "#5FB079",
                fontWeight: "bold",
                marginRight: "10px", 
                marginTop: "-220px"
              }}
            >
              내용:
            </Typography>
            <TextField
              id="title"
              fullWidth
              multiline //여러 줄 입력 활성화
              rows={9}
              style={{
                color: "#5FB079",
                flex: "1", 
              }}
              color="primary"
            />
          </Box>
          <Button 
          variant="contained" 
          color="primary" 
          style={{
            width: '16rem', 
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
          onClick={handleEmotionPage}
          >
            저장
        </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default WriteDiary;
