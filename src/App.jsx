import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Main from './components/Main';
import Today from './pages/TodayPage';
import WritePage from './pages/WritePage';
import WriteDiary from './components/Write/WriteDiary';
import LookDiary from './components/Write/LookDiary';
import EmotionPage from './pages/EmotionPage';

import { ThemeProvider } from 'styled-components';
import EditDiary from './components/Write/EditDiary';

const theme = {
  primaryGreen: '#5FB079',
  red_1: '#FF0000', // 일요일 색상
  blue_1: '#0000FF', // 토요일 색상
  gray_5: '#F5F5F5', // 배경색
};

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
          <Route path='auth'>
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignupPage/>} />
        </Route>
        <Route path='today' element={<Today />} />
        <Route path='write' element={<WritePage />} />
        <Route path='write/lookDiary' element={<LookDiary />} />
        <Route path='write/diary' element={<WriteDiary />} />
        <Route path='write/todayDiary' element={<WriteDiary />} />
        <Route path='write/editDiary' element={<EditDiary/>} />
        <Route path='write/diary/emotion' element={<EmotionPage />} />
      </Routes>
    </div>
    </ThemeProvider>
  );
}

export default App;
