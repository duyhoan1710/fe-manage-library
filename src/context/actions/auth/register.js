import axiosInstance from 'helpers/axiosInstance';
import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from 'constants/actionTypes';

export const register =
  ({ email, password, username, lastName, firstName }) =>
  (dispatch) => {
    dispatch({
      type: REGISTER_LOADING,
    });

    axiosInstance()
      .post('/auth/register', {
        email,
        password,
        username,
        lastName,
        firstName,
      })
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: REGISTER_ERROR,
          payload: err.response ? err.response.data : 'COULD NOT CONNECT',
        });
      });
  };
