import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => <div>
  <div>
    <div>Simple Game Description</div>
    <Link to="game">Start Game Action Item</Link>
  </div>
</div>;

export default Home;