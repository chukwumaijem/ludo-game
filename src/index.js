import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './mystyles.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import ReactDOM from 'react-dom';
import GameFrame from './game-frame.js';

class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			winSize: {}
		}
	}
  render() {
  	const winSize = {};
  	winSize.width = window.innerWidth;
  	winSize.height = window.innerHeight;
    return (
    	<div className="">
    		{/*<div className="jumbotron text-center">
    			<h1>Welcome to my ludo game app</h1>
    			<p>It's going to be marvelous</p>
    			<img src='../resources/images/icon.png' />
    		</div>*/}
    		<div className="game-frame" style={{width: winSize.Height, height: winSize.Height}}>
    			<GameFrame />
    		</div>
      </div>
    );
  }
};

ReactDOM.render(<Game />, document.getElementById('root'));