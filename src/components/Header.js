import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@material-ui/core/IconButton';

function Header() { 
  return (
    <div className="header-container">
      <div className="header-wrapper">
        <IconButton>
          <FontAwesomeIcon icon="bars" />
        </IconButton>
        <p style={{ paddingLeft: '1em', fontSize: '20px'}}>React Master Detail View</p>
      </div>

      <div className="logout-btn d-flex">
        <IconButton>
          <FontAwesomeIcon icon="user" />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;