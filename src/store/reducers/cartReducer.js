import {  SET_CART } from '../actions/cartActions';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
      case 'ADD_TO_CART_SUCCESS':
        return {
          ...state,
          cartItems: action.payload.items,
          totalItems: action.payload.totalItems,
          totalPrice: action.payload.totalPrice
        }; 
    default:
      return state;
  }
};

export default cartReducer;
