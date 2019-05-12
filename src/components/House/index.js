import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSelectedSeed } from '../../actions';
import { NUMBER } from '../../utils/constants';

class HouseFrame extends React.Component {
  selectSeed = (seedId) => {
    this.props.setSelectedSeed(seedId)
  }

  renderCards = (label, houseCards, houseColour) => {
    const cards = [];
    const seedSize = this.props.houseHeight * 0.15;
    Object.keys(houseCards).forEach((card, index) => {
      if (!card.endsWith('Colour') && houseCards[card].position === 'still') {
        cards.push(
          <div
            className={
              `house-seeds house-colour-${houseColour} seed-${index} ${houseCards[card].disabled && 'disabled'}`
            }
            key={index}
            style={{
              width: `${seedSize}px`,
              height: `${seedSize}px`,
              margin: `${seedSize * 0.5}px`,
              textAlign: 'center',
              color: 'white',
              lineHeight: `${seedSize}px`,
            }}
            onClick={() => this.selectSeed(card)}
          >
            {index + 1}
          </div>
        );
      }
    });
    return cards;
  }
  render() {
    const { houseHeight, houseNumber, disabled } = this.props;
    const label = houseNumber;
    const houseCards = this.props.gameData[`house${NUMBER[label]}Cards`];
    const houseColour = disabled ? 'grey' : houseCards[`H${label}-Colour`];
    const colorClass = `house-colour-${houseColour}-light`;

    return (
      <div className={colorClass} style={{ width: houseHeight, height: houseHeight, padding: houseHeight * 0.2 }}>
        <div style={{
          width: houseHeight * 0.6, height: houseHeight * 0.6,
          backgroundColor: 'white', display: 'flex', flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'absolute'
        }}>
          {this.renderCards(label, houseCards, houseColour)}
        </div>
      </div>
    );
  }
};

function mapStateToProps({ gameData }) {
  return {
    playerTurn: gameData.playerTurn,
    gameData,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSelectedSeed,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseFrame);