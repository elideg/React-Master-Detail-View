import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';

function ListView(props) {

  if (!props.items.length) {
    return (
      <h1>no data</h1>
    )
  } else {
    return (
      <div className="list-container">
        <h2 className="ml-5">Items</h2>
  
        <ul>
          {props?.items?.map(item => (
            <li key={item.id} className="item" onClick={() => props.selectItem(item)}>
              <div className="list-item">
                <span>{item.name}</span>
                <span>{item.description}</span>
              </div>
  
              <IconButton color="primary" onClick={() => props.delete(item.id)}>
                <FontAwesomeIcon icon="times" />
              </IconButton>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListView;