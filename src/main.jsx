import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';
import { applyTheme, readInitialTheme, subscribeSystemTheme } from './utils/theme';
import { setTheme } from './store/slices/uiSlice';

// Apply the persisted/system theme before React mounts so there's no flash.
applyTheme(readInitialTheme());

// If the user's mode is 'system', follow OS preference changes live.
subscribeSystemTheme(() => {
  const mode = store.getState().ui.theme;
  if (mode === 'system') store.dispatch(setTheme('system'));
});

// Register PWA service worker (handled by vite-plugin-pwa automatically)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
