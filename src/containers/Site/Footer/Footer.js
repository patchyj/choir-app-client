import React from 'react';
import './Footer.css';

const footer = props => {
  return (
    <footer className="footer">
      Made by{' '}
      <a href="http://www.jackjwmcgregor.com" target="_blank" rel="noopener noreferrer">
        {' '}
        Jack McGregor
      </a>
    </footer>
  );
};

export default footer;
