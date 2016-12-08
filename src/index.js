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
  	const winSize = window.innerHeight * 0.95;
    return (
    	<div className="text-center" style={{height: winSize}}>
    		{/*<div className="jumbotron text-center">
    			<h1>Welcome to my ludo game app</h1>
    			<p>It's going to be marvelous</p>
    			<img src='../resources/images/icon.png' />
    		</div>*/}
    		<div className="game-frame">
    			<GameFrame  gameBoardHeight={winSize}/>
    		</div>
      </div>
    );
  }
};

ReactDOM.render(<Game />, document.getElementById('root'));