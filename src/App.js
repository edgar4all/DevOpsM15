import logo from './logo.svg';
import React, { useState} from 'react';
import './App.css';

function App() {
  
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  function addItem(){

    if(!newItem){
      alert('nada que agregar');
      return ;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem
    };

    setItems(oldList => [...oldList, item]);
    setNewItem("");

    console.log(items);
  }

  function deleteItem(id){
    const newArray = items.filter( item => item.id != id);
    setItems(newArray);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />        
        <p>React Todo List XLSS</p>
        
        <input 
        type="text" 
        placeholder='Agregar item...'
        onChange={e => setNewItem(e.target.value)}
        />

        <button onClick={() => addItem()} >Agregar</button>

        <ul>
          {items.map(item => {
            return (
              <li key={item.id}>
                {item.value}
                <button onClick={ () => deleteItem(item.id) } >X</button>
              </li>
            )
          })}
          
        </ul>

      </header>
    </div>
  );
}

export default App;
