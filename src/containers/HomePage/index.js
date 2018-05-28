import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const Home = () => <div>
  <Header />
  <div>
    <div>Simple Game Description</div>
    <Link to="game">Start Game Action Item</Link>
  </div>
  <div>Footer</div>
</div>;

export default Home;