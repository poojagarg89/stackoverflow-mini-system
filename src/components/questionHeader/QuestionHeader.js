import React from 'react';
import stackOverflowLogo from '../../assets/stackoverflowLogo.png';
import { useNavigate } from 'react-router-dom';

export default function QuestionHeader({ loggedInUser }) {
  const navigate = useNavigate();

  const onBtnClick = val => {
    if (val === 'loginBtn') {
      navigate('/login');
    } else {
      navigate('/registration');
    }
  };

  const onLogoutClick = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
    window.location.reload();
  };

  const onLogoClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="question-header-main">
      <img className="stackoverflow-logo" src={stackOverflowLogo} alt="stackoverflow-logo" onClick={onLogoClick} />
      {loggedInUser?.displayName ? (
        <div className="user-details">
          <h5 className="user-text">{loggedInUser?.displayName}</h5>
          <button className="logout-btn" onClick={onLogoutClick}>
            LogOut
          </button>
        </div>
      ) : (
        <div className="login-btn-section">
          <button className="login-btn" onClick={() => onBtnClick('loginBtn')}>
            Log in
          </button>
          <button className="signup-btn" onClick={() => onBtnClick('registerBtn')}>
            Sign up
          </button>
        </div>
      )}
    </div>
  );
}
