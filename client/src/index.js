import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if ('serviceWorker' in navigator) {
  console.log("Will the service worker register?");
  navigator.serviceWorker.register('service-worker.js', {
    updateViaCache: 'none',
  })
    .then(function(reg){
      console.log("Yes, it did.");
  }).catch(function(err) {
      console.log("No it didn't. This happened:", err)
  });
}

ReactDOM.render(<App />, document.getElementById('root'));
