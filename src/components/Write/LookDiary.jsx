import React, { useState, useEffect } from "react";
import {Box, Button, Grid, Typography, createTheme, ThemeProvider } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import Server from "../../utils/API";
import moment from "moment";
import { useMemo } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7EDC9C",
    },
  },
});

const LookDiary = () => {
  const location = useLocation();
  const selectedDate = useMemo(() => {
    const dateFromState = location.state?.selectedDate;
    if (!dateFromState) return new Date();
    if (typeof dateFromState === "string") {
      return moment(dateFromState, 'YYYY.MM.DD').toDate();
    }
    return dateFromState;
  }, [location.state]);

  const navigate = useNavigate();

  const [diaryData, setDiaryData] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const getFormattedDate = (date) => moment(date).format("YYYY.MM.DD");

  useEffect(() => {
    const formattedDate = getFormattedDate(selectedDate); // 선택된 날짜 포맷
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setDiaryData(null);
      setLoading(false);
      return;
    }

    Server.get("/diary")
      .then((response) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const diary = response.data.find((d) => {
          const diaryDate = d.date;
          return diaryDate === formattedDate && d.userId === user.id;
        });
        setDiaryData(diary || null);
      })
      .catch((error) => {
        console.error("서버 요청 실패: ", error); // 에러 처리
      })
      .finally(() => {
        setLoading(false); // 로딩 완료
      });
  }, [selectedDate]);

  // ✏️ 수정 버튼 클릭 핸들러
  const handleEdit = () => {
    navigate("/write/editDiary", { state: { diaryData } });
  };

  const handleEmotion = () => {
    if (!diaryData) return alert("일기 데이터가 없습니다.");
    if (!diaryData.emotionResponse || !diaryData.emojiUrl) {
      return alert("아직 공감 데이터가 생성되지 않았습니다.");
    }
    navigate(`/write/diary/lookEmotion/${diaryData.id}`);
  }

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      Server.delete(`/diary/${diaryData.id}`)
        .then(() => {
          alert("다이어리가 성공적으로 삭제되었습니다.");
          navigate("/write"); 
        })
        .catch((error) => {
          console.error("삭제 실패: ", error);
          alert("삭제에 실패했습니다. 다시 시도해주세요.");
        });
    }
  };

  if (loading) {
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
          <Typography variant="h5" color="primary" style={{ marginTop: "20px" }}>
            데이터를 불러오는 중입니다... 
          </Typography>
        </Grid>
      </ThemeProvider>
    );
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
                flex: "1",
              }}
            >
              {getFormattedDate(new Date(selectedDate))}
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
              variant="h5"
              style={{
                color: "#5FB079",
                flex: "1",
                wordWrap: "break-word",
                fontWeight: "bold",
              }}
            >
              {diaryData?.title || "제목오류"}
            </Typography>
          </Box>

          <Box
            borderTop={"3px solid #5FB079"}
            width="100%"
            marginBottom="20px"
          />
          <Box
            display="flex"
            alignItems="flex-start"
            style={{
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <Typography
              variant="body1"
              style={{
                color: "#5FB079",
                flex: "1",
                wordWrap: "break-word",
                fontWeight: "bold",
              }}
            >
              {diaryData?.content || "내용 오류"}
            </Typography>
          </Box>
          <Box
            borderTop={"3px solid #5FB079"}
            width="100%"
            marginBottom="20px"
          />

          <Box
            display="flex"
            justifyContent="space-between"
            style={{
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleEdit}
              style={{
                width: "16rem",
                height: "3rem",
                fontSize: "1.4rem",
                fontFamily: '"Jua", serif',
                backgroundColor: "#BEEDCD",
                color: "#7EDC9C",
                marginTop: "16px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#7EDC9C"; 
                e.target.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#BEEDCD"; 
                e.target.style.color = "#7EDC9C";
              }}
            >
              수정 ✏️
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEmotion}
              style={{
                width: "16rem",
                height: "3rem",
                fontSize: "1.4rem",
                fontFamily: '"Jua", serif',
                backgroundColor: "#BEEDCD",
                color: "#7EDC9C",
                marginTop: "16px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#7EDC9C"; 
                e.target.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#BEEDCD"; 
                e.target.style.color = "#7EDC9C";
              }}
            >
              공감 ♥️
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
              style={{
                width: "16rem",
                height: "3rem",
                fontSize: "1.4rem",
                fontFamily: '"Jua", serif',
                backgroundColor: "#BEEDCD",
                color: "#7EDC9C",
                marginTop: "16px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#7EDC9C"; 
                e.target.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#BEEDCD"; 
                e.target.style.color = "#7EDC9C";
              }}
            >
              삭제🗑️
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LookDiary;
