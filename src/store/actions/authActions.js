export const loginRequest = (payload) => ({
    type: 'LOGIN_REQUEST',
    payload,
  });
  
  export const loginSuccess = (user, token) => ({
    type: 'LOGIN_SUCCESS',
    payload: {user, token}
  });
  
  export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
  });
  
  export const registerRequest = (payload) => ({
    type: 'REGISTER_REQUEST',
    payload,
  });
  
  export const registerSuccess = (user, token) => ({
    type: 'REGISTER_SUCCESS',
    payload: {user, token}
  });
  
  export const registerFailure = (error) => ({
    type: 'REGISTER_FAILURE',
    payload: error,
  });
  
