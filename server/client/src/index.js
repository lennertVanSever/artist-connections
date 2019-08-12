import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js', {
    updateViaCache: 'none',
  });
}

ReactDOM.render(<App />, document.getElementById('root'));
