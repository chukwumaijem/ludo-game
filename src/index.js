import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import GameFrame from './containers/GamePlay';
import Home from './containers/HomePage';
import store from './store';
// import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import 'toastr/build/toastr.css';
import './mystyles.css';

const Game = () => {
  return (<Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/game" component={GameFrame} />
      </div>
    </Router>
  </Provider>
  );
};

render(<Game />, document.getElementById('root'));
// registerServiceWorker();
