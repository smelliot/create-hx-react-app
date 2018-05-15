// We are using this file to swap out different models for testing
// Don't warn about these unused files
/* eslint no-unused-vars: off */

import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import App from './app/App';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
