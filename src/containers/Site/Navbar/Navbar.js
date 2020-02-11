import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUpload, faFolderOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.scss';

const navbar = props => {
  console.log(props);
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
          Home
        </Link>
      </div>
      <div className="right">
        {props.isUser ? (
          <React.Fragment>
            <Link to="/upload">
              <FontAwesomeIcon icon={faUpload} />
              Upload
            </Link>
            <Link to="/allfiles">
              <FontAwesomeIcon icon={faFolderOpen} />
              Your Files
            </Link>
            <Link to="/" onClick={props.logoutHandler}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default navbar;
