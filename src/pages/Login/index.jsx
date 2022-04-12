import React from 'react';

import LoginUI from './Component/LoginForm';
import useForm from './Component/LoginForm/useForm';

const LoginContainer = () => {
  return <LoginUI form={useForm()} />;
};

export default LoginContainer;
