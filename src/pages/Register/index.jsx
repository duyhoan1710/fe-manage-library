import React, { useEffect } from 'react';

import RegisterUI from './Component/RegisterForm';
import useForm from './Component/RegisterForm/useForm';

const RegisterContainer = () => {
  useEffect(() => {}, []);

  return <RegisterUI form={useForm()} />;
};

export default RegisterContainer;
