import React, { Component, Fragment } from 'react';
import Toastr from 'toastr';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setNumberOfPlayers } from '../../actions';
import './HomePage.module.css';

class HomePage extends Component {
  state = {
    numberOfPlayers: 4,
  };

  startGame = (e) => {
    e.preventDefault();
    const { numberOfPlayers } = this.state;
    if (numberOfPlayers < 2 || numberOfPlayers > 4) {
      return Toastr.error('Number of players must be from 2 and 4.', 'Error');
    }

    this.props.setNumberOfPlayers(numberOfPlayers);
  }

  handleChange = (e) => {
    this.setState({ numberOfPlayers: e.target.value });
  }

  render() {
    const { numberOfPlayers } = this.state;
    const { numberOfPlayersUpdated } = this.props;
    if (numberOfPlayersUpdated) return (<Redirect to="/play" />);

    return (
      <Fragment>
        <div className="jumbotron text-center">Welcome to DazeLudo</div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 section">
              Simple Game Description
          </div>
            <div className="col-md-6 section">
              <form onSubmit={this.startGame}>
                <div className="form-group">
                  <label>Number of Players</label>
                  <input
                    className="form-control"
                    name="numberOfPlayers"
                    value={numberOfPlayers}
                    onChange={this.handleChange}
                    type="number"
                    max="4"
                    min="2"
                  />
                </div>
                <div className="form-group">
                  <input className="btn btn-primary" value="Create Game" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToprops({ gameData: { numberOfPlayersUpdated } }) {
  return {
    numberOfPlayersUpdated,
  }
}

export default connect(mapStateToprops, { setNumberOfPlayers })(HomePage);
