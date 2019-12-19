import React, { useState, useEffect } from 'react';
import '../components/styles.css';
import Breakfast from '../components/Breakfast.js';
import AllDay from '../components/AllDay.js';
import Logo from '../components/BurgerQueen.js';
import firebase from '../firebase'
import MenuItem from '../components/MenuItem'
import Button from '../components/Button'
import Input from '../components/Input';

const Saloon = () => {
  document.title = `Burger Queen`;
  const [pedidos, setPedidos] = useState([]);
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0);
  const [client, setClient] = useState('');
  const [table, setTable] = useState('');

  useEffect(() => {
    firebase.firestore().collection('menu').get().then((snap => {
      const getMenu = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setItems(getMenu);
    })
    )
  }, [])

  const addItem = (item) => {
    if (!pedidos.includes(item)) {
      item.count = 1
      setPedidos([...pedidos, item])

    } else {
      item.count += 1
      setPedidos([...pedidos])
    }
    setTotal(total + (item.price));
  }
  const removeItem = (item) => {
    const index = pedidos.findIndex((i) => i.id === item.id)
    pedidos[index].count--;
    if (pedidos[index].count === 0) {
      pedidos.splice(index, 1);
    }
    setPedidos([...pedidos])
  }


  function onSubmit(e) {
    e.preventDefault()
    firebase
      .firestore()
      .collection('orders')
      .add({
        client,
        table,
        pedidos,
        total
      })
      .then(() => {
        setTable('')
        setClient('')
        setPedidos([])
        setTotal('')

      })
  }


  return (
    <>
      <Logo />
      <h3 className="text">Menu</h3>
      <div className="app">
        <Breakfast items={items} onClick={addItem} />
        <AllDay items={items} onClick={addItem} />

        <h1>Order</h1>
        <li className="list">
          <Input
            id='clientName'
            title='Nome do cliente'
            type='text'
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
          <Input
            id='clientTable'
            title='Número da Mesa'
            type='number'
            value={table}
            onChange={(e) => setTable(e.target.value)}
          />
          <section>
            <div>
              {pedidos.map(pe => <MenuItem key={pe.id} name={pe.name} price={pe.price} count={pe.count} onClick={() => removeItem(pe)} />)}
              {pedidos.map(pe => <Button class="" onClick={() => removeItem(pe)}>X</Button>)}
            </div>
            <p>Total:{pedidos.reduce((acc, curr) => acc + curr.price * curr.count, 0) + ",00"} </p>
            <Button
              class="menu-text menu-item" onClick={onSubmit}>Enviar Pedido
          </Button>
          </section>
        </li>
      </div>
    </>
  );
}

export default Saloon;