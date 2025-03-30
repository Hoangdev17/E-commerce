import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Dùng localStorage mặc định
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';
import rootSaga from './sagas/authSaga';
import cartSaga from './sagas/cartSaga';

const sagaMiddleware = createSagaMiddleware();

// Cấu hình persist
const persistConfig = {
  key: 'root',  // Tên khóa để xác định trong storage
  storage,  // Lưu trữ trạng thái vào localStorage
  whitelist: ['auth', 'cart'], // Chỉ lưu trữ các reducer cần thiết
};

// Kết hợp các reducer
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

// Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store với persisted reducer
const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware)
);

// Chạy các saga
sagaMiddleware.run(rootSaga);
sagaMiddleware.run(cartSaga);

// Tạo persistor
const persistor = persistStore(store);

export { store, persistor };
