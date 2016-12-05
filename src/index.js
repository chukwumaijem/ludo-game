import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import ReactDOM from 'react-dom';

class Game extends React.Component {
  render() {
    return (
    	<div className="container">
    		<div className="jumbotron text-center">
    			<h1>Welcome to my ludo game app</h1>
    			<p>It's going to be marvelous</p>
    			<img src='../resources/images/icon.png' />
    		</div>
      </div>
    );
  }
};

ReactDOM.render(<Game />, document.getElementById('root'));