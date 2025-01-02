import { Button, Grid } from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment"; // 날짜 포맷을 위한 라이브러리
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 1200px;
  height: 550px;
  max-height: 550px;
  border: 3px solid #5FB079;

  .react-calendar__navigation {
    background-color: #fff;
    color: #000; 
    font-size: 1.6rem;
    font-weight: bold;
    border: none; 
  }

  .react-calendar__navigation__label {
    background-color: #fff !important;
    color: #000; 
    font-size: 1.8rem;
  }

  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="토요일"] {
    color: ${(props) => props.theme.blue_1};
  }

  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: ${(props) => props.theme.red_1};
  }

  .react-calendar__tile {
    &--weekend {
      color: ${(props) => props.theme.gray_5};
    }
    font-size: 1.4rem;
    padding: 15px 30px 40px 30px;
  }

  .react-calendar__tile abbr[aria-label*="토요일"] {
    color: ${(props) => props.theme.blue_1};
  }

  .react-calendar__tile--now {
    background: #e4ffed;
    border-radius: 0.3rem;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: ${(props) => props.theme.primaryGreen};
    color: white;
    border-radius: 0.3rem;
  }

  .react-calendar__navigation__arrow {
    font-size: 2rem;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-calendar__tile.saturday {
    color: ${(props) => props.theme.blue_1};
  }
`;

const WritePage = () => {
  const navigate = useNavigate(); 

  const [diaries, setDiaries] = useState([])

  useEffect(() => {
    axios.get("http://localhost:9999/diary")
      .then((response) => {
        setDiaries(response.data)
      })
      .catch((error) => {
        console.error("에러 메시지: ", error)
      })
  }, [])

  const renderTileContent = ({ date }) => {
    const formattedDate = moment(date).format("YYYY.MM.DD");
     const diaryForDate = diaries.find((diary) => diary.date === formattedDate); // 특정 날짜에 해당하는 다이어리 검색

    if (diaryForDate) {
      return <div>📖</div>;
    }
    return null; 
  };

  const handleWriteTodayDiary = () => {
    navigate("/write/todayDiary"); 
  };

  const today = new Date(); // 현재 날짜
  const [date, setDate] = useState(today); 

  const handleDateChange = (newDate) => {
    setDate(newDate); // 날짜 선택 시 상태 업데이트
  };

  const handleDateClick = (clickedDate) => {
    const formattedDate = moment(clickedDate).format("YYYY.MM.DD"); // 날짜 포맷팅
    const diaryForDate = diaries.find((diary) => diary.date === formattedDate); // 해당 날짜의 다이어리 검색

    if (diaryForDate) {
      navigate("/write/lookDiary", { state: { selectedDate: clickedDate } });
    } else {
      navigate("/write/diary", { state: { selectedDate: clickedDate } });
    }
  };

  const tileClassName = ({ date }) => {
    if (date.getDay() === 6 /* 토요일 */) {
      return "saturday"; 
    }
    return ""; 
  };

  return (
    <>
      <Header /> 
      <Grid
        container
        marginTop={"20px"}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        
        <StyledCalendar
          className="custom-calendar"
          value={date} // 현재 선택된 날짜
          tileClassName={tileClassName} // 타일 클래스 지정
          onChange={handleDateChange} // 날짜 변경 이벤트 핸들러
          onClickDay={handleDateClick} // 날짜 클릭 이벤트 핸들러
          formatDay={(locale, date) => moment(date).format("D")} // 날짜 형식
          formatYear={(locale, date) => moment(date).format("YYYY")} // 연도 형식
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 월/연도 형식
          calendarType="gregory" // 캘린더 타입 (양력)
          showNeighboringMonth={false} // 이웃한 달 표시 여부
          next2Label={null} // 두 달 후 화살표 숨김
          prev2Label={null} // 두 달 전 화살표 숨김
          minDetail="month" // 최소 표시 단위: 월
          maxDetail="month" // 최대 표시 단위: 월
          tileContent={renderTileContent} // 타일 콘텐츠 렌더링
        />

        <Button
          variant="contained"
          color="primary"
          style={{
            width: "20rem",
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
          onClick={handleWriteTodayDiary}
        >
          오늘의 일기 작성
        </Button>
      </Grid>
    </>
  );
};

export default WritePage;
