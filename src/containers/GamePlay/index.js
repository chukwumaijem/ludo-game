import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toastr from 'toastr';

import { setHouseColours, updateBoardSettings } from '../../actions';
import SideBoard from '../../components/SideBoard';
import Houses from '../../components/Houses';

class GameFrame extends React.Component {
  state = {}
  componentDidMount() {
    const settings = {
      gameBoardHeight: this.props.gameBoardHeight,
      sideBoardWidth: window.innerWidth - this.props.gameBoardHeight,
    };
    const colours = this.props.colours;
    if (colours) {
      this.props.setHouseColours(colours);
    }
    this.props.updateBoardSettings(settings);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState !== nextProps && nextProps.notification
      && Object.keys(nextProps.notification).length > 0) {
      const { type, message, title } = nextProps.notification;
      Toastr[type.toLowerCase()](message, title);
    }
    return null;
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
function mapStateToProps({ gameData, gameSettings }) {
  return {
    notification: gameData.notification,
    colours: gameSettings.colours,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setHouseColours,
    updateBoardSettings
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameFrame);