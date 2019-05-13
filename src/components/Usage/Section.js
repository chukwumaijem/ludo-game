import React from 'react';
import './index.css';

export const Section = ({ heading, description, gifUrl, data }) => {
  return (
    <div className="media section">
      {!data && <img src={gifUrl} className="mr-3" alt="" />}
      <div className="media-body">
        <h5 className="mt-0">{heading}</h5>
        {data && data.map((item, index) => <Section {...item} key={index} />)}

        {!data && <div>{description}</div>}
      </div>
    </div>
  );
}
