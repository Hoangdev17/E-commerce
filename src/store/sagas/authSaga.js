import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loginSuccess, loginFailure, registerSuccess, registerFailure } from '../actions/authActions';
import { push } from "redux-first-history"

function* loginSaga(action) {
  
  try {
    let res;
    if (action.payload.isGoogleLogin) {
      res = yield call(axios.post, 'https://e-commerce-1-6nku.onrender.com/api/auth/google', {
        token: action.payload.googleToken,
      });
    } else {
      res = yield call(axios.post, 'https://e-commerce-1-6nku.onrender.com/api/auth/login', action.payload);
    }

    
    // Kiểm tra key token trong response
    const { token, user } = res.data;
   
    if (!token) throw new Error("Token is missing from response");

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    const redirectUrl = localStorage.getItem("redirectAfterLogin") || "/";

    yield put(loginSuccess({ user, token }));

    if (redirectUrl) {
      localStorage.removeItem("redirectAfterLogin");
      window.location.href = redirectUrl;
    } else {
      console.log("No redirect, staying on the same page");
    }
  } catch (error) {
    
    yield put(loginFailure(error.response?.data?.message || 'Đăng nhập thất bại'));
  }

  
}

  function* registerSaga(action) {
    try {
      console.log(action.payload);
      const res = yield call(axios.post, 'https://e-commerce-1-6nku.onrender.com/api/auth/register', action.payload);
      const { token, user } = res.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
  
      yield put(registerSuccess(user, token));
    } catch (error) {
      yield put(registerFailure(error.response?.data?.message || 'Đăng ký thất bại'));
    }
  }

export default function* watchAuth() {
  yield takeLatest('LOGIN_REQUEST', loginSaga);
  yield takeLatest('REGISTER_REQUEST', registerSaga);
}
