import React from 'react';
import ReactDOM from 'react-dom/client';  // Use `react-dom/client` in React 18
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import App from './App';
import 'antd/dist/reset.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create root using createRoot

root.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
