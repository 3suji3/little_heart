import { Button, Grid, Typography, Box } from "@mui/material";
import Header from "../Header";
import { useNavigate,  useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const LookEmotion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [aiResponse, setAiResponse] = useState("잠시만 기다려 주세요... 😊");
  const [emojiUrl, setEmojiUrl] = useState(""); // 생성된 이미지 URL
  const [diaryData, setDiaryData] = useState(null);

  const handleBackEmotion = () => {
    navigate("/write/diary/emotion");
  };

  const handleBackLD = () => {
    if (diaryData?.date) {
      navigate("/write/lookDiary", {state: { selectedDate: diaryData.date } });
    } else {
      navigate("/write/lookDiary");
    }
  }

  useEffect(() => {
    const fetchEmotionData = async () => {

      try {
        const response = await fetch(`http://localhost:9999/diary/${id}`)
        const diary = await response.json()

        if (diary.emotionResponse && diary.emojiUrl) {
          setAiResponse(diary.emotionResponse)
          setEmojiUrl(diary.emojiUrl)
          setDiaryData(diary);
        }
        
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        setAiResponse("공감 데이터를 가져오지 못했습니다. 다시 시도해 주세요.");
      }
    };

    if (id) fetchEmotionData();
  }, [id]);

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
        {emojiUrl ? (
          <img
            src={emojiUrl}
            alt="이모지"
            style={{
              height: "180px",
              marginBottom: "20px",
            }}
          />
        ) : (
          <Typography variant="h6" style={{ color: "#5FB079" }}>
            이모지를 불러오는 중입니다...
          </Typography>
        )}
        <Typography
          variant="h5"
          style={{
            color: "#5FB079",
            fontWeight: "bold",
            width: "500px",
            maxHeight: "9rem",
            overflowY: "auto",
          }}
        >
          {aiResponse}
        </Typography>
        <Box
            display="flex"
            justifyContent="center"
            style={{
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                width: "10rem",
                height: "2.8rem",
                fontSize: "1.2rem",
                fontFamily: '"Jua", serif',
                backgroundColor: "#7EDC9C",
                color: "#fff",
                border: "3px #5FB079 solid",
                margin: "50px 16px 0 0",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#fff";
                e.target.style.color = "#5FB079";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#7EDC9C";
                e.target.style.color = "#fff";
              }}
              onClick={handleBackLD}
            >
              돌아가기
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{
                width: "10rem",
                height: "2.8rem",
                fontSize: "1.2rem",
                fontFamily: '"Jua", serif',
                backgroundColor: "#fff",
                color: "#5FB079",
                border: "3px #5FB079 solid",
                marginTop: "50px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#7EDC9C";
                e.target.style.color = "#fff";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#fff";
                e.target.style.color = "#5FB079";
              }}
              onClick={handleBackEmotion}
            >
              다시공감하기
            </Button>
          </Box>
      </Grid>
    </Grid>
  );
};

export default LookEmotion;
