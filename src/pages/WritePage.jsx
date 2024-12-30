import { Box, Button, Grid, Typography } from "@mui/material"
import Header from "../components/Header"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const WritePage = () => {
  const navigate = useNavigate();

  //현재 날짜 기준 상태 관리
  const [currentDate, setCurrentDate] = useState(new Date())

  const handleBackMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() -1, 1)
      return newDate
    })
  }

  const handleFrontMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() +1, 1)
      return newDate
    })
  }

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() +1).padStart(2, '0')
    return `${year}.${month}`
  }

  const handleWriteDiary = () => {
    navigate('/write/diary')
  }

  return (
    <>
      <Header></Header>
      <Grid
        container
        marginTop={'20px'}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <FontAwesomeIcon
            icon={faPlay}
            rotation={180}
            style={{
              fontSize: '4rem',
              color: '#BEEDCD',
              marginBottom: '1rem',
              marginRight: '10px',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.target.style.color = '#7EDC9C';
            }}
            onMouseOut={(e) => {
              e.target.style.color = '#BEEDCD';
            }}
            onClick={handleBackMonth}
            ></FontAwesomeIcon>
            <Typography
              variant="h4"
              style={{
                color: "#5FB079",
                fontWeight: "bold",
                textAlign: "center", 
                flex: "1", // 공간 균등 분배
                marginLeft: "190px",
                marginRight: "190px",
                marginTop: "10px",
              }}
            >
              {formatDate(currentDate)}
            </Typography>
            <FontAwesomeIcon
            icon={faPlay}
            style={{
              fontSize: '4rem',
              color: '#BEEDCD',
              marginBottom: '1rem',
              marginLeft: '10px',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.target.style.color = '#7EDC9C';
            }}
            onMouseOut={(e) => {
              e.target.style.color = '#BEEDCD';
            }}
            onClick={handleFrontMonth}
            ></FontAwesomeIcon>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          style={{
            width: '20rem', 
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
          onClick={handleWriteDiary}
          >
            일기 작성
        </Button>
      </Grid>
    </>
  )
}

export default WritePage