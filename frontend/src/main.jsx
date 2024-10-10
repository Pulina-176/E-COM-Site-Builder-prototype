import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './stores/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)

