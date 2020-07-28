import React, { useState, useEffect } from 'react';
import {
  faBars as fasBars,
  faUser as fasUser,
  faTimes as fasTimes
} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import ListView from './components/ListView';
import DetailsView from './components/DetailView';
import Header from './components/Header';
import axios from 'axios';
import './App.css';

const BASE_URL = 'https://basic-json-db.herokuapp.com/items';

const getUrlWithId = id => `${BASE_URL}/${id}`;

function App() {
  const [selectedItem, setSelectedItem] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(BASE_URL).then(res => {
      setItems(res.data);
    }).catch(error => {
      console.error(error);
    })
  }, [setItems])

  const deleteItem = async id => {
    try {
      await axios.delete(getUrlWithId(id), selectedItem);
      setItems(prevItems => prevItems = prevItems.filter(item => item.id !== id));
    } catch(error) {
      console.error('ERROR DELETING ITEM', error);
    } finally {
      resetItem();
    }
  }

  const selectItem = item => {
    setSelectedItem(item);
  }

  const resetItem = () => {
    setSelectedItem({});
  }

  const updateItem = async item => {
    try {
      await axios.put(getUrlWithId(item.id), item);
      setItems(currItems => currItems = currItems.map(currItem => item.id === currItem.id ? {...item} : currItem));
    } catch (error) {
      console.error('ERROR UPDATING ITEM', error);
    } finally {
      resetItem();
    }
  }

  const createItem = async item => {
    if (!item) {
      alert('Please fill out form');
    } else {
      try {
        const newItem = (await axios.post(BASE_URL, item)).data;
        setItems((currentItems) => currentItems = [...currentItems, newItem]);
      } catch (error) {
        console.error('ERROR CREATING ITEM', error);
      } finally {
        resetItem();
      }
    }
  };

  return (
    <div>
      <Header/>
      <div className="wrapper">
        <ListView
          items={items}
          selectItem={selectItem}
          delete={deleteItem}
        />
        <DetailsView
          item={selectedItem}
          add={createItem}
          update={updateItem}
          resetSelectedItem={resetItem}
        />
      </div>
    </div>
  );
}

library.add(fasBars, fasUser, fasTimes);

export default App;
