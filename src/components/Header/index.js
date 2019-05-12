import React from 'react';

const PageHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">DazeLudo</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav float-right">
          <li className="nav-item">
            <a className="nav-link disabled" href="/rooms/public">Public Rooms</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="how-to-play/">How to Play</a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="/login">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default PageHeader;
