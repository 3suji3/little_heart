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
  const [emojiUrl, setEmojiUrl] = useState(""); 

  const handleBackWrite = () => {
    navigate("/write");
  };

  useEffect(() => {
    const emotionResponse = async () => {
      try {
        const userDiary = location.state?.diary || ""; // 전달된 일기 데이터 
        const diaryId = location.state?.id; // 일기 고유 id

        console.log("넘어온 diaryId:", diaryId);

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
          prompt: `사용자가 쓴 글과 관련이 있고 사용자가 정말 공감할만한 감성적이고 귀여운 이모지로 나타내줘 : "${userDiary}". 반드시 이 글과 어울릴만한 것으로 그려야해!!`,
          n: 1,
          size: "256x256", 
        });

        const generatedEmojiUrl = imageResponse.data[0].url
        setEmojiUrl(generatedEmojiUrl)

        await fetch(`http://localhost:9999/diary/${diaryId}`, {
          method: "PATCH", // 기존 일기에 감정 데이터 추가
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            emotionResponse: aiMessage,
            emojiUrl: generatedEmojiUrl,
          })
        })
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
            }}
          />
        ) : (
          <Typography variant="h6" style={{ color: "#5FB079" }}>
            이미지를 생성 중입니다...
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
