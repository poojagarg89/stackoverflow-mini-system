import React, { useCallback, useState } from 'react';
import StackIcon from '../../assets/stackIcon.png';
import { useNavigate } from 'react-router-dom';

export default function RegistrationComp() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  const onInputChange = useCallback(
    e => {
      const { name, value } = e.target;
      setUserDetails({ ...userDetails, [name]: value });
    },
    [userDetails],
  );

  const onSignupClick = () => {
    if (userDetails?.displayName && userDetails?.email && userDetails?.password) {
      let oldData = JSON.parse(localStorage.getItem('userData'));
      if (oldData?.length > 0) {
        localStorage.setItem('userData', JSON.stringify([...oldData, userDetails]));
      } else {
        localStorage.setItem('userData', JSON.stringify([userDetails]));
      }
      alert('User registered successfully.');
      navigate('/login');
    } else {
      alert('Please fill all details.');
      setUserDetails({
        displayName: '',
        email: '',
        password: '',
      });
    }
  };
  return (
    <div className="login-register-main">
      <img src={StackIcon} alt="stackIcon" className="stack-icon-img" />
      <div className="login-register-content">
        <h4 className="email-text">Display name</h4>
        <input
          type="text"
          value={userDetails?.displayName}
          className="email-input"
          onChange={onInputChange}
          name="displayName"
        />
        <h4 className="email-text">Email</h4>
        <input type="email" value={userDetails?.email} className="email-input" onChange={onInputChange} name="email" />
        <h4 className="pass-text">Password</h4>
        <input
          type="password"
          value={userDetails?.password}
          className="pass-input"
          onChange={onInputChange}
          name="password"
        />

        <div>
          <button className="login-register-btn" type="submit" onClick={onSignupClick}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
