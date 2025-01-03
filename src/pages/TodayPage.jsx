import Header from "../components/Header";
import { Box, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from 'react';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env['REACT_APP_API_KEY'], 
  dangerouslyAllowBrowser: true, 
});

const TodayPage = () => {
  const [username, setUsername] = useState('사용자'); 
  const [quote, setQuote] = useState("잠시만 기다려 주세요 ...😊")
  const [author, setAuthor] = useState("")

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    //가장 최근의 다이어리 데이터, openai 호출
    const todayResponse = async () => {
      try {
        const diaries = await fetch("http://localhost:9999/diary")
          .then((response) => response.json());

        if (!diaries || diaries.length === 0) {
          setQuote("최근 작성한 다이어리가 없습니다ㅠㅠ 다이어리를 작성하세요!")
          setAuthor("");
          return;
        }

        //최근 날짜 기준 정렬
        const recentDiary = diaries
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        if (!recentDiary) {
          setQuote("최근 작성한 다이어리가 없습니다ㅠㅠ 다이어리를 작성하세요!");
          setAuthor("");
          return;
        }

        console.log("가장 최근 다이어리:", recentDiary);

        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "사용자의 다이어리 내용을 기반으로 어울리는 한국어 명언을 추천해주고, 그 명언을 말한 사람을 출력해 주세요. 명언과 화자는 다음 형식으로 출력하세요:\n\n'명언 내용' - 화자"
            },
            {role: "user", content: `사용자의 다이어리: ${recentDiary.content}`}
          ],
        })
        
        const aiResponse = chatCompletion.choices[0]?.message?.content;
        console.log("AI 응답:", aiResponse);
        
        if (!aiResponse) {
          setQuote("AI로부터 명언을 가져오는 데 실패했습니다.");
          setAuthor("");
          return;
        }

        // OpenAI 응답에서 명언과 화자를 분리
        const match = aiResponse.match(/['"“](.*?)['"”]\s*-\s*(.+)/);
        console.log(match)

        if(match) {
          setQuote(match[1])
          setAuthor(match[2])
        } else {
          setQuote("명언을 생성할 수 없습니다.")
          setAuthor("")
        }
      } catch (error) {
        console.error("OpenAI 호출 실패: ", error)
        setQuote("명언을 가져오는 중 오류 발생")
        setAuthor("")
      }
    }
    
    todayResponse()
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
            {/* “나만이 내 인생을 바꿀 수 있다. 아무도 날 대신해 해줄 수 없다.” */}
            {quote}
          </Typography>
          {author && (
            <Typography
            variant="body2"
            style={{
              color: '#7EDC9C',
              fontSize: '1rem',
            }}
            >
              -{author}
              {/* - 캐롤 버넷 */}
            </Typography>
          )} 
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

export default TodayPage;
