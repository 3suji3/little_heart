import { Button, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const EmotionPage = () => {
  const navigate = useNavigate()

  const handleBackWrite = () => {
    navigate('/write')
  }
  return (
    <Grid>
      <Header />
      <Grid
        container
        style={{
          width: "1200px",
          height: "600px",
          backgroundColor: "#BEEDCD",
          marginTop: "25px",
          marginLeft: "160px",
          borderRadius: "16px",
          textAlign: "center",
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          alignItems: "center", 
        }}
      >
        <img
          src="/img/emotion.png"
          alt="이모지"
          style={{
            height: "180px",
            marginBottom: "20px", 
            marginTop: "-50px"
          }}
        />
        <Typography
          variant="h4"
          style={{
            color: "#5FB079",
            fontWeight: "bold",
            width: "500px",
          }}
        >
          당신은 짱이 될 수 있을 거예요. 파이팅!
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          style={{
            width: '10rem', 
            height: '2.8rem', 
            fontSize: '1.2rem', 
            fontFamily: '"Jua", serif', 
            backgroundColor: '#fff', 
            color: '#5FB079',
            border: '3px #5FB079 solid',
            marginTop: '100px'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#7EDC9C';
            e.target.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#fff';
            e.target.style.color = '#5FB079';
          }}
          onClick={handleBackWrite}
        >
          돌아가기
        </Button>
      </Grid>
    </Grid>
  );
};

export default EmotionPage;
