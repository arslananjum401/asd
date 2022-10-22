import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from './Store';
import { Provider } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js';
import { Elements, } from '@stripe/react-stripe-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT_KEY);

root.render(
  // <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={Store}>
        <App />
      </Provider>
    </Elements>
  /* </React.StrictMode>  */
);


