import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { setCart } from '../actions/cartActions';


function*  fetchCartSaga() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return; // Hoặc bạn có thể xử lý lỗi ở đây.
    }

  const response = yield call(axios.get, 'https://e-commerce-1-6nku.onrender.com/api/cart', {
    headers: {
      Authorization: `Bearer ${token}`,  
    },
  });
    yield put(setCart(response.data.items));
  } catch (error) {
    console.error('Failed to fetch cart', error);
  }
}

function* addToCart(action) {
  try {
    const token = localStorage.getItem('token');
    console.log(action.payload);
    const res = yield call(() =>
      axios.post('https://e-commerce-1-6nku.onrender.com/api/cart/add', { ...action.payload }, {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      })
    );
    yield put({ type: 'ADD_TO_CART_SUCCESS', payload: res.data });
    
  } catch (error) {
    console.error('Add to cart failed', error);
  }
}

function* updateCartItem(action) {
  try {
    const { productId, quantity } = action.payload;
    const token = localStorage.getItem('token');

     yield call(() =>
      axios.put(
        `https://e-commerce-1-6nku.onrender.com/api/cart/update`,
        { productId, quantity }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );

    
    yield put({ type: 'FETCH_CART' });
  } catch (error) {
    console.error('❌ Cập nhật số lượng thất bại:', error.response?.data || error.message);
  }
}

export function* removeFromCart(action) {
  try {
    const { productId } = action.payload;
    console.log("Saga removing:", productId); 
    const token = localStorage.getItem('token');

    yield call(() =>
      axios.delete(`https://e-commerce-1-6nku.onrender.com/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    yield put({ type: 'FETCH_CART' }); 
  } catch (error) {
    console.error('Remove from cart failed:', error);
  }
}

function* cartSaga() {
  yield takeLatest('FETCH_CART', fetchCartSaga);
  yield takeLatest('ADD_TO_CART', addToCart);
  yield takeLatest('UPDATE_CART_ITEM', updateCartItem);
  yield takeLatest('REMOVE_FROM_CART', removeFromCart);
}

export default cartSaga;
