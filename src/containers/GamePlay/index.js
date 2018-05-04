import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setHouseColours } from '../../actions';
import SideBoard from '../../components/SideBoard';
import Houses from '../../components/Houses';

class GameFrame extends React.Component {

  componentWillMount() {
    this.props.setHouseColours();
  }
  
  render() {
    const gameBoardHeight = this.props.gameBoardHeight;
    const sideBoardWidth = window.innerWidth - gameBoardHeight;
    return (
      <div>
        <Houses height={gameBoardHeight} />
        <SideBoard width={sideBoardWidth} />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    gameData: state.gameData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setHouseColours,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameFrame);