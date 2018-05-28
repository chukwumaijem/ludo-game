import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GameFrame from './containers/GamePlay';
import HomePage from './containers/HomePage';
import Header from './components/Header';

import store from './store';
// import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import 'toastr/build/toastr.css';
import './mystyles.css';

const Home = () => <div>
  <Header />
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="how-to-play" />
  </Switch>
  <div>Footer</div>
</div>;

const Game = () => {
  return (<Provider store={store}>
    <Router>
      <Switch>
        <Route path="/play/:roomid" component={GameFrame} />
        <Route render={() => Home()} />
      </Switch>
    </Router>
  </Provider>
  );
};

render(<Game />, document.getElementById('root'));
// registerServiceWorker();
