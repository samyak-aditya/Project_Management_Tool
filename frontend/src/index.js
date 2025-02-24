import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MyProvider from "./components/ContextApi/MyProvider.jsx";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <MyProvider>
    <App />
    </MyProvider> 
  </React.StrictMode>
);

