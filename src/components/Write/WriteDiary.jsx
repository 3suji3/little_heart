import React, { useState } from "react";
import { Box, Grid, Typography, TextField, Button, createTheme, ThemeProvider} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import Server from "../../utils/API";
import { v4 as uuidv4 } from "uuid"
import moment from "moment";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7EDC9C",
    },
  },
});

const WriteDiary = () => {
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || new Date();

  const getFormattedDate = (date) => {
    return moment(date).format("YYYY.MM.DD");
  };

  const navigate = useNavigate();

  const [diaryData, setDiaryData] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setDiaryData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSaveDiary = async () => {
    if (!diaryData.title || !diaryData.content) {
      alert("모든 필드를 채워주세요.");
      return;
    }
  
  const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const newDiary = {
        id: uuidv4(), //랜덤 id 생성
        date: getFormattedDate(selectedDate),
        title: diaryData.title,
        content: diaryData.content,
        userId: user.id
      };

      console.log("생성된 일기 ID: ", newDiary)

      const response = await Server.post("/diary", newDiary);

      if (response.status === 201 ) { //Created 상태인지 확인
        alert("일기가 저장되었습니다.")
        navigate("/write/diary/emotion", { state: { id: newDiary.id, diary: newDiary.content } });
      } else {
        throw new Error("일기 저장에 문제가 있습니다 ㅠㅠ")
      }
    } catch (error) {
      console.error("일기 저장 실패: ", error)
      alert("일기 저장 중 오류 발생")
    }
    // const diaries = JSON.parse(localStorage.getItem("diaries")) || [];
    // diaries.push({
    //   date: getFormattedDate(selectedDate),
    //   ...diaryData,
    // });
    // localStorage.setItem("diaries", JSON.stringify(diaries));

    // alert("일기가 저장되었습니다!");
    // navigate("/write"); 
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
              {getFormattedDate(new Date(selectedDate))}
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
            저장
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default WriteDiary;
