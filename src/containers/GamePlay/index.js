import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setHouseColours, updateBoardSettings } from '../../actions';
import SideBoard from '../../components/SideBoard';
import Houses from '../../components/Houses';

class GameFrame extends React.Component {
  componentDidMount() {
    const settings = {
      gameBoardHeight: this.props.gameBoardHeight,
      sideBoardWidth: window.innerWidth - this.props.gameBoardHeight,
    };
    this.props.updateBoardSettings(settings);
  }
  componentWillMount(colours) {
    if(colours){
      this.props.setHouseColours(colours);
    }
  }
  
  render() {
    return (
      <div>
        <Houses />
        <SideBoard />
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setHouseColours,
    updateBoardSettings
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(GameFrame);