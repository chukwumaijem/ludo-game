import React from 'react';
import { Section } from '../../components/Usage/Section';

// import how to gifs
import startGameGif from '../../assets/images/how_to_gifs/1_start_game.gif';
import leaveHouseGif from '../../assets/images/how_to_gifs/2_leave_the_house.gif';
import finishCardv1 from '../../assets/images/how_to_gifs/3a_finish_card.gif';
import finishCardv2 from '../../assets/images/how_to_gifs/3b_finish_card.gif';
import winGame from '../../assets/images/how_to_gifs/4_winning_the_game.gif';

import './index.css';

const startGameDesc = (
  <div>
    <p>To Start a Game, select the number of players on the home page.
      There can be a minimum of 2 players and a maximum of 4. COM features are not available yet.</p>
    <p>When you have entered your desired number of players, click the &quot;Create Game&quot; button to start.
      You will be presented with the numberof houses corresponding to the number of players entered.
      The other houses will be disabled.
    </p>
  </div>
);

const leaveHouseDesc = (
  <div>
    <p>TThe bottom right sidebar changes colour to indicate which house should plau next.
      House here refers to a coloured square. We have:</p>
    <ul>
      <li>Blue House</li>
      <li>Red House</li>
      <li>Green House, and</li>
      <li>Yello House</li>
    </ul>
    <p>A player needs to throw a six to bring a seed out of the house. And when its out, can move it the
      number of throw they get. Seeds refer to the coloured small circles matching the colour of a players house.</p>
    <p>When you have gotten a six(for a seed still inside the house), or any value(for a seed already out), select
      the seed you want to move. You should see the seed appear on the right sidebar. Also select the number/value
      you want to count on the seed by selecting one or more of your throw result. Then click on the &quot;Play It&quot;
      button.</p>
    <em>If a player throws double six, the have a chance to throw again.</em>
  </div>
);

const finishCardv1Desc = (
  <div>
    <p>You reset your opponents seed when your seed count ends on the cell where their seed is.</p>
    <p>This has a double effect</p>
    <ul>
      <li>Their seed goes back to the house and starts from the beggining</li>
      <li>Your seed is marked done and removed from the board.And you cone one step closer to victory!</li>
    </ul>
  </div>
);
const finishCardv2Desc = (
  <div>
    <p>TYou can also finished your seed's move by getting them home.</p>
    <p>Seeds are home when they go around the course and get into their coloured rail When
      they enter these rails, their progress cannot be reset by an opponent.</p>
  </div>
);
const winGameDesc = (
  <div>
    <p>To Win the Game, be the first to get all your seeds home.</p>
    <p>When there are more than two people playing, other players can continue until there is only one player
      left to finish.</p>
    <p>
      However if you wish to restart the game at any point, click the &quot;Restart&quot; button on the right sidebar.
      If you wish to create a new game, maybe to either increase or decrease the number of players,
       click the &quot;New Game&quot; button.</p>
      <em>When you Restart a game in 2 or 3 player mode, you may not get the same colour of houses as they are randomly picked.</em>
  </div>
);


const finish1 = { heading: "Reset an oponent's progress", gifUrl: finishCardv1, description: finishCardv1Desc };
const finish2 = { heading: "Complete the course", gifUrl: finishCardv2, description: finishCardv2Desc };

const HowToPlay = () => {
  return (
    <div className="container space-bottom">
      <h1 className="big-header">How To Play DazeLudo</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <Section heading="Start a game" description={startGameDesc} gifUrl={startGameGif} />
        </li>
        <li className="list-group-item">
          <Section heading="Leave the house" description={leaveHouseDesc} gifUrl={leaveHouseGif} />
        </li>
        <li className="list-group-item">
          <Section heading="Completing a die's move" data={[finish1, finish2]} />
        </li>
        <li className="list-group-item">
          <Section heading="Win the Game" description={winGameDesc} gifUrl={winGame} />
        </li>
      </ul>
    </div>
  );
}

export default HowToPlay;
