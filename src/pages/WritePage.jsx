import { Button, Grid } from "@mui/material";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useState } from "react";
import styled from "styled-components";

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

  const handleWriteTodayDiary = () => {
    navigate("/write/todayDiary");
  };

  const today = new Date();
  const [date, setDate] = useState(today);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleDateClick = (clickedDate) => {
    navigate("/write/diary", { state: { selectedDate: clickedDate } });
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
          value={date}
          tileClassName={tileClassName} 
          onChange={handleDateChange}
          onClickDay={handleDateClick}
          formatDay={(locale, date) => moment(date).format("D")}
          formatYear={(locale, date) => moment(date).format("YYYY")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="month" 
          maxDetail="month"
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
            marginTop: "16px"
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
