import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "./App.css";
import firebase from './firebase.js';
import allMenu from './Menu.js';
import Input from './components/Input.js';



// firebase.firestore().collection('menu').add({

// })
const MenuItem = ({ title, items }) => {
  const Product = (props) => (
    <ul className="menu-item">
      <Button
        onClick={props.onClick}
        className="menu-name">{props.name}
        <span className="menu-price subtitle">R${props.price}</span>
      </Button>
    </ul>
  )
  return (
    <>
      <p className="text">{title}</p>
      <div className="list">
        {items.map((item, index) => <Product key={index} {...item} />)}
      </div>
    </>
  )
}
const List = () => {
  return (
    <div id="orderList" >
      <div>
        <p >Total:</p>
        <p >R$ total</p>
      </div>
    </div>
  );
};


const Menu = () => {
  const [menu, setMenu] = useState('')
  const [input, setInput] = useState('');
  const [inputN, setInputN] = useState(0);

  useEffect(() => {
    firebase.firestore().collection('menu').get().then(doc => {
      doc.forEach(data => setMenu(data.data()))
    })
  }, [])

  const handleSubmit = () => {
    console.log(input, inputN)
  }
  const handleAdd = () => { 
    console.log(menu)
  }

  return (
    <>
      <section className="menu-item">
        <MenuItem items={allMenu.sideDish} title="Acompanhamentos" />
        <MenuItem items={allMenu.beverage} title="Bebidas" />
        <MenuItem items={allMenu.extras} title="Adicionais" />
        <MenuItem items={allMenu.burgers} title="Burgers" />
        <MenuItem items={allMenu.breakfast} title="Café da Manhã" />
        <div className="text">
          <Input
            id='clientName'
            title='Nome'
            type='text'
            placeholder='Nome do cliente'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Input
            id='clientTable'
            title='Mesa'
            type='number'
            placeholder='00'
            value={inputN}
            onChange={(e) => setInputN(e.target.value)}
          />
          <List />
          <Button
            className="btn-cozinha" onClick={handleSubmit}>Enviar para cozinha
          </Button>
          <Button
            className="btn-cozinha" onClick={handleAdd}>Pegar menu
          </Button>

        </div>
      </section>

    </>
  );



}
export default Menu;
