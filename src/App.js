import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Questions from './components/questionComponent/Questions';
import QuestionHeader from './components/questionHeader/QuestionHeader';
import LoginComp from './components/authentication/LoginComp';
import RegistrationComp from './components/authentication/RegistrationComp';
import AskQuestionComp from './components/askQuestion/AskQuestionComp';
import LoginError from './components/authentication/LoginError';
import QuestionsDetails from './components/questionComponent/QuestionsDetails';
import ErrorHandleComp from './components/authentication/ErrorHandleComp';

function App() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const urlPath = window.location.pathname;
  let isFlag = 0;
  if (
    urlPath === '/registration' ||
    urlPath === '/login' ||
    urlPath === '/' ||
    urlPath === '/user-login-error' ||
    urlPath === '/ask-questions' ||
    urlPath.includes('/questions/')
  ) {
    isFlag = 1;
  }
  return (
    <div className="App">
      <BrowserRouter>
        {isFlag === 1 ? (
          <>
            <QuestionHeader loggedInUser={loggedInUser && loggedInUser} />
            <Routes>
              <Route path="/" element={<Questions />}></Route>
              <Route path="/login" element={<LoginComp />}></Route>
              <Route path="/user-login-error" element={<LoginError />}></Route>
              <Route path="/registration" element={<RegistrationComp />}></Route>
              <Route path="/ask-questions" element={<AskQuestionComp />}></Route>
              <Route path="/questions/:id" element={<QuestionsDetails />}></Route>
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path={urlPath} element={<ErrorHandleComp />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
