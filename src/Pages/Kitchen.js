import React, { useEffect, useState } from 'react';
import firebase from '../firebase'
import '../components/styles.css';
import Button from '../components/Button'
import { Link } from 'react-router-dom';
const hmh = require('hmh');

const Kitchen = () => {
  const [orders, getOrders] = useState([])
  const [orderdone, setOrderDone] = useState([])
  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('orders').where('status', '==', '').onSnapshot((snap => {
      const pedidos = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      getOrders(pedidos);
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
    firebase.firestore().collection('orders').where('status', '==', 'delivered').onSnapshot((snap => {
      const pedidos = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setDelivery(pedidos);
    })
    )

  }, [])


  const orderDone = (item) => {

    firebase
      .firestore().collection('orders').doc(item.id).update({
        status: 'done',
        hourDone: new Date().getTime(),
      })
      .then(() => {
        setOrderDone([...orderdone, { ...item, status: 'done', hourDone: new Date().getTime() }])
      })
    if (item.status === 'done') {
      const index = orders.findIndex((i) => i.id === item.id)
      orders.splice(index, 1);
    }
  }

  const delivered = (item) => {
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
      <section className="root-kitchen">
        <h1  className="h2">Cozinha</h1>
        <h2 className="h2">Pedidos a serem feitos</h2>
        <div className="app-kitchen app">
          <div className="order-done">
            {orders.map((order) => {
              return (
                <section className="section" key={order.id}  >
                  <div className="order-div">
                    <div className="menu-name">
                      <p className="text client-text"> Cliente: {order.client}</p>
                      <p className="text client-text"> Mesa: {order.table}</p>
                    </div>
                    <div className="order-itens">
                      <span className="menu-name text">Pedidos:</span>
                      {order.pedidos.map(item => <span className="order-kitchen" key={item.id}> {item.name} Qtd: {item.count} </span>)}
                    </div>
                    <Button class="btn-enviar burger-queen" onClick={() => orderDone(order)}>Pronto</Button>
                  </div>
                </section>

              )
            })}
          </div>

        </div>

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
                        <Button class="btn-enviar burger-queen" onClick={() => delivered(item)}>Entregue</Button>
                      </div>

                      : null}
                  </section>

                )
              })}
            </div>

          </div>
        </section>

        <section className="root-kitchen">
          <h2 className="h2">Pedidos entregues</h2>
          <div className="app-kitchen app">
            {delivery.map((item, index) => {
              const send = `${new Date(item.hourSend).getHours()}h ${new Date(item.hourSend).getMinutes()}m`;
              const hDelivered = `${new Date(item.hourDelivered).getHours()}h ${new Date(item.hourDelivered).getMinutes()}m`;
              const time = (hmh.diff(`${send}`, `${hDelivered}`).toString());
              return (
                <div className="order-done" key={index} >
                  {item.status === 'delivered' ?
                    <section className="section">
                      <div className="order-div">
                        <div className="menu-name">
                          <p className="text client-text"> Cliente: {item.client}</p>
                          <p className="text client-text"> Mesa: {item.table}</p>
                        </div>
                        <div className="order-itens">
                          <span className="menu-name text">Pedidos:</span>
                          {item.pedidos.map((item, index) =>
                            <span className="order-kitchen" key={index}> {item.name} Qtd: {item.count} </span>)}
                          <span className="time">Tempo de preparo:{time}</span>
                        </div>
                      </div>
                    </section>

                    : null}

                </div>


              )
            })}

          </div>
        </section>


      </section>

    </>

  );
}
export default Kitchen;  