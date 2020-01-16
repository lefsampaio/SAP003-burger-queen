import React, { useState, useEffect, useRef } from 'react';
import '../components/styles.css';
import AllMenu from '../components/AllMenu';
import firebase from '../firebase'
import ResumeItem from '../components/ResumeItem'
import Button from '../components/Button'
import Input from '../components/Input';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';
import Navbar from '../components/Navbar';
import { useHistory } from 'react-router-dom'

const effect =
{
  fadeAway: true,
  fadeAwayTimeOut: 1000,
}

const Saloon = () => {
  const history = useHistory();
   const logout = () => {
    firebase.auth()
      .signOut()
      .then(history.push('/'))
      .catch(() => {
        growl.error({ text: 'Ocorreu um erro ao sair', ...effect })
      });
  };

  document.title = `Burger Queen`;
  const [pedidos, setPedidos] = useState([]);
  const [items, setItems] = useState([]);
  const [client, setClient] = useState('');
  const [table, setTable] = useState('');
  const [orderdone, setOrderDone] = useState([])
  const [delivery, setDelivery] = useState([]);


  useEffect(() => {
    firebase.firestore().collection('menu').get().then((snap => {
      const getMenu = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setItems(getMenu);
    })
    )
    firebase.firestore().collection('orders').where('status', '==', 'done').onSnapshot((snap => {
      const pedidos = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setOrderDone(pedidos);
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
          status: 'pending',
          hourSend: new Date().getTime()
        }).then(() => {
          growl.success({ text: 'Pedido Enviado', ...effect })
        })
      setTable('')
      setClient('')
      setPedidos([])
    }

    else if (!pedidos.length) {
      growl.warning({ text: 'Selecione ao menos um produto para realizar o pedido', ...effect })
    }
    else if (!client) {
      growl.warning({ text: 'Insira o nome do cliente', ...effect })
    }
    else if (!table) {
      growl.warning({ text: 'Insira o número da Mesa', ...effect })
    }

  }

  const delivered = (item, e) => {
    e.preventDefault()
    firebase
      .firestore().collection('orders').doc(item.id).update({
        status: 'delivered',
        hourDelivered: new Date().getTime()
      })
      .then(() => {
        setDelivery([...delivery, { ...item, status: 'delivered', hourDelivered: new Date().getTime() }])
      })
    if (item.status === 'done') {
      const index = orderdone.findIndex((i) => i.id === item.id)
      orderdone.splice(index, 1);
    }

  }

  return (
    <>
      <Navbar onClick={logout} />
      <section className="root">
        <div className="app">
          <h1 className="h2">Menu</h1>
          <AllMenu title='Café da Manhã' type='breakfast' items={items} onClick={addItem} />
          <AllMenu title='All Day' type='sideDish' items={items} onClick={addItem} />
          <AllMenu type='burgers' items={items} onClick={addItem} />
          <AllMenu type='beverage' items={items} onClick={addItem} />
          <AllMenu type='extra' items={items} onClick={addItem} />
        </div>
        <div className="order-list">
          <form className="list">
            <h1 className="text">Pedidos</h1>
            <section>
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
              <div className="order-itens">
                {pedidos.map(pe => <ResumeItem key={pe.id} name={pe.name} price={pe.price} count={pe.count} onClick={(e) => removeItem(pe, e)} />)}
              </div>
              <p className="text">Total: R${pedidos.reduce((acc, curr) => acc + curr.price * curr.count, 0) + ",00"} </p>
              <Button
                class="btn-enviar burger-queen" onClick={onSubmit}>Enviar Pedido
          </Button>
              <section className="root-kitchen">
                <h2 className="h2">Pronto para a Entrega</h2>
                <div className="app-kitchen app">
                  <div className="order-done">
                    {orderdone.map((item) => {
                      return (
                        <section className="section" key={item.id}  >
                          {item.status === 'done' ?
                            <div className="order-div">
                              <div className="menu-name">
                                <p className="text client-text"> Cliente: {item.client}</p>
                                <p className="text client-text"> Mesa: {item.table}</p>
                              </div>
                              <div className="order-itens" key={item.id}>
                                <span className="menu-name text">Pedidos:</span>
                                {item.pedidos.map(item => <span className="order-kitchen" key={item.id}> {item.name} Qtd: {item.count} </span>)}
                              </div>
                              <Button class="btn-enviar burger-queen" onClick={(e) => delivered(item, e)}>Entregue</Button>
                            </div>

                            : null}
                        </section>

                      )
                    })}
                  </div>
                </div>
              </section>
            </section>
          </form>
        </div>


      </section>
    </>
  );
}

export default Saloon;