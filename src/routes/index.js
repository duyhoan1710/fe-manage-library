import RegisterComponent from '../pages/Register';
import LoginComponent from '../pages/Login';

const routes = [
  {
    path: '/auth/register',
    component: RegisterComponent,
    title: 'Register',
    needsAuth: false,
  },

  {
    path: '/auth/login',
    component: LoginComponent,
    title: 'Login',
    needsAuth: false,
  },
];

export default routes;
