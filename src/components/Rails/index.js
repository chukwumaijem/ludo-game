import React from 'react';
import { buildRails } from '../../utils/buildRails';

export const VRailFrame = ({ VRailHeight, boxPosition, boxColour, seedData, disabled }) => {
  const colour = disabled ? 'grey' : boxColour;
  return (
    <div className="rails" style={{ width: VRailHeight * 0.5, height: VRailHeight }} >
      {buildRails(3, 6, VRailHeight * 0.5, boxPosition, colour, seedData)}
    </div>
  );
};

export const HRailFrame = ({ HRailHeight, boxColour, boxPosition, disabled, seedData }) => {
  const colour = disabled ? 'grey' : boxColour;
  return (
    <div className="rails" style={{ width: HRailHeight * 2, height: HRailHeight }} >
      {buildRails(6, 3, HRailHeight, boxPosition, colour, seedData)}
    </div>
  );
};
