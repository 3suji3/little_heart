import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Main from './components/Main';
import Today from './pages/TodayPage';
import WritePage from './pages/WritePage';
import WriteDiary from './components/Write/WriteDiary';
import EmotionPage from './pages/EmotionPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
          <Route path='auth'>
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignupPage/>} />
        </Route>
        <Route path='today' element={<Today />} />
        <Route path='write' element={<WritePage />} />
        <Route path='write/diary' element={<WriteDiary />} />
        <Route path='write/diary/emotion' element={<EmotionPage />} />
      </Routes>
    </div>
  );
}

export default App;
