import React from 'react';
import LoginComp from './LoginComp';

export default function LoginError() {
  return (
    <>
      <div className="login-error-main">
        <h4>You must be logged in to ask a question on Stack Overflow</h4>
        <div>
          Log in below or <span className="signup-text">sign up</span>
        </div>
      </div>
      <LoginComp />
    </>
  );
}
