import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import GameFrame from './containers/GamePlay';
import store from './store';
// import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.css';
import './mystyles.css';

class Game extends Component {
  render() {
    const winSize = window.innerHeight * 0.95;
    const gameContainerStyle = {
      height: winSize,
      display: 'flex',
      justifyContent: 'center'
    };
    return (
      <Provider store={store}>
        <div style={gameContainerStyle}>
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
