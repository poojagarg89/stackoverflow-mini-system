import React, { useState, useCallback, useEffect } from 'react';
import StackIcon from '../../assets/stackIcon.png';
import { useNavigate } from 'react-router-dom';

export default function LoginComp() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem('userData'));

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    localStorage.removeItem('loggedInUser');
  }, []);

  const onInputChange = useCallback(
    e => {
      const { name, value } = e.target;
      setUserInfo({ ...userInfo, [name]: value });
    },
    [userInfo],
  );

  const onLoginClick = () => {
    let filterUser = data?.find(item => item?.email === userInfo?.email && item?.password === userInfo?.password);
    if (filterUser) {
      alert('Login Successful');
      localStorage.setItem('loggedInUser', JSON.stringify(filterUser));
      navigate('/');
      window.location.reload();
    } else {
      alert('Invalid crendential, please try after again...');
    }
  };

  const onSignupClick = () => {
    navigate('/registration');
  };
  return (
    <div className="login-register-main">
      <img src={StackIcon} alt="stackIcon" className="stack-icon-img" />
      <div className="login-register-content">
        <form>
          <h4 className="email-text">Email</h4>
          <input type="email" className="email-input" onChange={onInputChange} name="email" required />
          <h4 className="pass-text">Password</h4>
          <input type="password" className="pass-input" onChange={onInputChange} name="password" required />

          <div>
            <button type="submit" className="login-register-btn" onClick={onLoginClick}>
              Log in
            </button>
          </div>
        </form>
      </div>
      <div className="signup-section">
        Don’t have an account?{' '}
        <span className="signup-text" onClick={onSignupClick}>
          Sign up
        </span>
      </div>
    </div>
  );
}
