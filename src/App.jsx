import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Main from './components/Main';
import Today from './pages/Today';

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
      </Routes>
    </div>
  );
}

export default App;
