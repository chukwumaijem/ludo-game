import React from 'react';

export default class HouseFrame extends React.Component {

  renderCards = () => {
    const cards = [];
    const availableCards = this.props.houseCards;
    const seedSize = this.props.houseHeight * 0.15;
    Object.keys(availableCards).map((card, index) => {
      if (card.substr(3, 6) !== 'Colour' && availableCards[card] === 'still') {
        cards.push(
          <div
            className={
              `house-colour-${this.props.houseColour} seed-${index}`
            }
            key={index}
            style={{
              width: seedSize,
              height: seedSize,
              margin: `${seedSize * 0.5}px`
            }}>
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
