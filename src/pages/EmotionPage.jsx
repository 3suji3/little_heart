import { Button, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom"; 
import { useEffect, useState } from "react";
import OpenAI from "openai"; 

const openai = new OpenAI({
  apiKey: process.env['REACT_APP_API_KEY'], 
  dangerouslyAllowBrowser: true, 
});

const EmotionPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [aiResponse, setAiResponse] = useState("잠시만 기다려 주세요... 😊"); 
  const [emojiUrl, setEmojiUrl] = useState(""); // 생성된 이모지 URL 

  const handleBackWrite = () => {
    navigate("/write");
  };

  useEffect(() => {
    const emotionResponse = async () => {
      try {
        const userDiary = location.state?.diary || ""; // 전달된 일기 데이터 

        if (!userDiary) {
          setAiResponse("일기를 작성하지 않은 것 같아요. 돌아가서 작성해 주세요!");
          return;
        }

        // AI 메시지 생성 
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-4o", 
          messages: [
            {
              role: "system",
              content:
                "너는 공감 잘하는 감정적이고 감성적인 사람이야. 사용자의 일기를 보고 감정을 공감해줘.",
            },
            { role: "user", content: userDiary },
          ],
        });
        console.log(chatCompletion.choices[0].message.content)

        const aiMessage = chatCompletion.choices[0].message.content;
        setAiResponse(aiMessage); // 메시지 상태 업데이트 

        // 이모지 이미지 생성 
        const imageResponse = await openai.images.generate({
          prompt: `사용자의 일기를 기반으로 감정적인 이모티콘을 만들어 주세요!: "${userDiary}". 이모티콘은 사용자가 공감이 느껴지게 해야 합니다!!`,
          n: 1,
          size: "256x256", // 이모지 크기 
        });

        setEmojiUrl(imageResponse.data[0].url); // 생성된 이미지 URL 설정
      } catch (error) {
        console.error("OpenAI API 호출 실패: ", error);
        setAiResponse("AI 응답을 가져오지 못했습니다. 다시 시도해 주세요.");
      }
    };

    emotionResponse(); 
  }, [location.state]);

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
              marginTop: "-50px",
            }}
          />
        ) : (
          <Typography variant="h6" style={{ color: "#5FB079" }}>
            이모지를 생성 중입니다...
          </Typography>
        )}
        <Typography
          variant="h5"
          style={{
            color: "#5FB079",
            fontWeight: "bold",
            width: "500px",
          }}
        >
          {aiResponse}
        </Typography>
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
          onClick={handleBackWrite}
        >
          돌아가기
        </Button>
      </Grid>
    </Grid>
  );
};

export default EmotionPage;
