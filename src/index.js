/**
 * index.js
 *
 * @author Philip Van Raalte
 * @date 2017-11-08
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {startSession, initSession} from './ng/NG_Connect';
import {unlockStartGame} from './ng/UnlockMedals';

import App from './App';

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

// NG Start Session
initSession();
startSession();
unlockStartGame();