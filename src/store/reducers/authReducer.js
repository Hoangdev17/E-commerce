const initialState = {
    user: null,
    loading: false,
    error: null,
    token: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
        return { ...state, loading: true, error: null };
      case 'LOGIN_SUCCESS':
        return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
      case 'LOGIN_FAILURE':
        return { ...state, loading: false, error: action.payload };

       // --- REGISTER ---
      case 'REGISTER_REQUEST':
        return { ...state, loading: true, error: null };
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          token: action.payload.token,
        };
      case 'REGISTER_FAILURE':
        return { ...state, loading: false, error: action.payload };  
      default:
        return state;
    }
  };
  
  export default authReducer;
  