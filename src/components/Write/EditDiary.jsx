import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import Server from "../../utils/API"; // 서버 API
import moment from "moment";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7EDC9C",
    },
  },
});

const EditDiary = () => {
  const location = useLocation();
  const diaryDataFromState = location.state?.diaryData; //전달받은 다이어리 데이터 
  const navigate = useNavigate();

  // 수정할 일기의 초기 상태 설정 
  const [diaryData, setDiaryData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    // 기존 다이어리 데이터 로드 
    if (diaryDataFromState) {
      setDiaryData({
        title: diaryDataFromState.title,
        content: diaryDataFromState.content,
      });
    }
  }, [diaryDataFromState]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDiaryData((prevState) => ({ ...prevState, [id]: value }));
  };

  // 다이어리 수정 저장 로직 
  const handleSaveDiary = async () => {
    if (!diaryData.title || !diaryData.content) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    try {
      const updatedDiary = {
        id: diaryDataFromState.id, // 기존 ID 유지
        date: diaryDataFromState.date, // 날짜 유지
        title: diaryData.title,
        content: diaryData.content,
      };

      // 서버에 수정된 데이터 저장 요청 
      await Server.put(`/diary/${updatedDiary.id}`, updatedDiary);

      alert("일기가 성공적으로 수정되었습니다!");
      navigate("/write"); 
    } catch (error) {
      console.error("일기 수정 실패: ", error);
      alert("일기 수정 중 오류가 발생했습니다.");
    }
  };

  const getFormattedDate = (date) => {
    return moment(date).format("YYYY.MM.DD");
  };

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
                flex: "1",
              }}
            >
              {getFormattedDate(new Date(diaryDataFromState?.date || new Date()))}
            </Typography>
          </Box>
          <Box borderTop={"3px solid #5FB079"} width="100%" marginBottom="20px" />
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
                marginTop: "-30px",
              }}
            >
              제목:
            </Typography>
            <TextField
              id="title"
              value={diaryData.title}
              onChange={handleInputChange}
              fullWidth
              style={{
                color: "#5FB079",
                flex: "1",
              }}
              color="primary"
            />
          </Box>
          <Box borderTop={"3px solid #5FB079"} width="100%" marginBottom="20px" />
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
                marginTop: "-220px",
              }}
            >
              내용:
            </Typography>
            <TextField
              id="content"
              value={diaryData.content}
              onChange={handleInputChange}
              fullWidth
              multiline
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
              width: "16rem",
              height: "3rem",
              fontSize: "1.4rem",
              fontFamily: '"Jua", serif',
              backgroundColor: "#BEEDCD",
              color: "#7EDC9C",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#7EDC9C";
              e.target.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#BEEDCD";
              e.target.style.color = "#7EDC9C";
            }}
            onClick={handleSaveDiary}
          >
            수정 저장
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default EditDiary;
