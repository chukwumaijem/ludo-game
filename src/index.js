import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';


import GameFrame from './containers/GamePlay';
import store from './store';
// import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './mystyles.css';

class Game extends Component {
  render() {
    const winSize = window.innerHeight * 0.95;
    return (
      <Provider store={store}>
        <div style={{ height: winSize, display: 'flex', justifyContent: 'center' }}>
          {/*<div className="jumbotron text-center">
          <h1>Welcome to my ludo game app</h1>
          <p>It's going to be marvelous</p>
          <img src='../resources/images/icon.png' />
          </div>*/}
          <div className="game-frame">
            <GameFrame gameBoardHeight={winSize} />
          </div>
        </div>
      </Provider>
    );
  }
};

render(<Game />, document.getElementById('root'));
// registerServiceWorker();
