import { ColorModeScript } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

import { Provider } from 'react-redux';
import { store, persistor } from './store/store';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <HelmetProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ColorModeScript />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </HelmetProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
