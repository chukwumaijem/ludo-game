import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSelectedSeed } from '../../actions';

class HouseFrame extends React.Component {
  selectSeed = (seedId) => {
    if (!seedId.substr(1, 1) === this.props.playerTurn.substr(1, 1)) return;
    // if ()
    this.props.setSelectedSeed(seedId)
  }

  renderCards = () => {
    const cards = [];
    const availableCards = this.props.houseCards;
    const seedSize = this.props.houseHeight * 0.15;
    Object.keys(availableCards).forEach((card, index) => {
      if (card.substr(3, 6) !== 'Colour' && availableCards[card].position === 'still') {
        cards.push(
          <div
            className={
              `house-colour-${this.props.houseColour} seed-${index} ${availableCards[card].disabled && 'disabled'}`
            }
            key={index}
            style={{
              width: seedSize,
              height: seedSize,
              margin: `${seedSize * 0.5}px`
            }}
            onClick={() => this.selectSeed(card)}
          >
          </div>
        );
      }
    });
    return cards;
  }
  render() {
    const houseHeight = this.props.houseHeight;
    const className = `house house-${this.props.position}`;
    const colorClass = `house-colour-${this.props.houseColour}-light`;
    return (
      <div className={className}>
        <div className={colorClass} style={{ width: houseHeight, height: houseHeight, padding: houseHeight * 0.2 }}>
          <div style={{
            width: houseHeight * 0.6, height: houseHeight * 0.6,
            backgroundColor: 'white', display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center',
            position: 'absolute'
          }}>
            {this.renderCards()}
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps({ gameData }) {
  return {
    playerTurn: gameData.playerTurn,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSelectedSeed,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseFrame);