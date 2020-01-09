import React, { useState, useEffect } from 'react';
import '../components/styles.css';
import Breakfast from '../components/Breakfast.js';
import AllDay from '../components/AllDay.js';
import firebase from '../firebase'
import ResumeItem from '../components/ResumeItem'
import Button from '../components/Button'
import Input from '../components/Input';
// import notification from '../components/notification';

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
  }

  const removeItem = (item, e) => {
    e.preventDefault()
    const index = pedidos.findIndex((i) => i.id === item.id)
    pedidos[index].count--;

    if (pedidos[index].count === 0) {
      pedidos.splice(index, 1);
    }
    setPedidos([...pedidos])
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (pedidos.length && table && client) {
      firebase
        .firestore()
        .collection('orders')
        .add({
          client,
          table,
          pedidos,
          total,
          status: '',
          hourSend: new Date().getTime()
        })
        .then(() => {
          setTable('')
          setClient('')
          setPedidos([])
          setTotal('')
        })

    }
    else if (!pedidos.length) {
      alert('Selecione ao menos um produto para realizar o pedido')
    }
    else if (!client) {
      alert('Insira o nome do cliente')
    }
    else if (!table) {
      alert('Insira o número da mesa')
    }

  }

  return (
    <>
      <section className="root">
        <div className="app">
          <h1  className="h2">Menu</h1>
          <Breakfast items={items} onClick={addItem} />
          <AllDay items={items} onClick={addItem} />
        </div>
        <div className="order-list">
          <form className="list">
            <h1 className="text">Pedidos</h1>
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
              <div className="order-itens">
                {pedidos.map(pe => <ResumeItem key={pe.id} name={pe.name} price={pe.price} count={pe.count} onClick={(e) => removeItem(pe, e)} />)}
              </div>
              <p className="text">Total: R${pedidos.reduce((acc, curr) => acc + curr.price * curr.count, 0) + ",00"} </p>
              <Button
                class="btn-enviar burger-queen" onClick={onSubmit}>Enviar Pedido
          </Button>
            </section>
          </form>
        </div>
      </section>
    </>
  );
}

export default Saloon;