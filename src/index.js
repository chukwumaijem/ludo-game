import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import GameFrame from './containers/GamePlay';
import HomePage from './containers/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import HowToPlay from './containers/HowToPlay';


import store from './store';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.css';
import './mystyles.css';

const NotFound = () => (
  <div className="center-all">
    <div>Page Not Found</div>
    <div>
      Return to&nbsp;
      <Link to="/">Home</Link>
    </div>
  </div>
);

const Home = () => <div>
  <Header />
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/how-to-play" component={HowToPlay} />
    <Route path="*" component={NotFound} />
  </Switch>
  <Footer />
</div>;

const Game = () => {
  return (<Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/play" component={GameFrame} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>
  );
};

render(<Game />, document.getElementById('root'));
registerServiceWorker();
