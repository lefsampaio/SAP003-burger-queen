import React, { useEffect, useState } from 'react';
import firebase from '../firebase'
import '../components/styles.css';
import Button from '../components/Button'
// import notification from '../components/notification';
const hmh = require('hmh');

const Kitchen = () => {
  const [orders, getOrders] = useState([])
  const [orderdone, setOrderDone] = useState([])
  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('orders').where('status','==','').onSnapshot((snap => {
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
        setOrderDone([...orderdone, {...item, status:'done',  hourDone: new Date().getTime()}])
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
        setDelivery([...delivery, {...item, status: 'delivered', hourDelivered: new Date().getTime()}])
      })
    if (item.status === 'done') {
      const index = orderdone.findIndex((i) => i.id === item.id)
      orderdone.splice(index, 1);
    }

  }

  return (
    <>
      <section className="root-kitchen">
        <h2 className="text">Kitchen</h2>
        <div className="app-kitchen">
          <h2>Pedidos a serem feitos</h2>
          <div className="order-done">
            {orders.map(order => {
              return (
                <section className="section" key={order.id}  >
                  <div className="order-div">
                    <p className="menu-name menu-text"> Cliente: {order.client}</p>
                    <p className="menu-name menu-text"> Mesa: {order.table}</p>
                    <span className="menu-name menu-text">Pedidos:</span>
                    {order.pedidos.map(p => <span className="menu-name" key={p.id}> {p.name} Qtd: {p.count} </span>)}

                    <Button class="btn-enviar burger-queen" onClick={() => orderDone(order)}>Pronto</Button>
                  </div>
                </section>

              )
            })}
          </div>
        </div>
        <section className="root-kitchen">
          <div className="app-kitchen">
            <h2>Pronto para a Entrega</h2>
            {orderdone.map((item, index) => {
              console.log(item)
              const send = `${new Date(item.hourSend).getHours}h ${new Date(item.hourSend).getMinutes}m`;
              const hDelivered = `${new Date(item.hourDelivered).getHours}h ${new Date(item.hourDelivered).getMinutes}m`;
              return (
                <div key={index} >
                  {item.status === 'done' ?
                    <div>
                      {console.log(hmh.diff(send, hDelivered).toString())}
                      <h3>Cliente: {item.client} - Mesa: {item.table}</h3>
                      {item.pedidos.map((item, index) =>
                        <div key={index}>
                          <p>{item.name} - Qtd:{item.count} </p>
                        </div>
                      )}
                      <Button class="btn-enviar burger-queen" onClick={() => delivered(item)}>Entregue</Button>
                    </div>
                    : null}

                </div>
              )
            }

            )
            }
          </div>

          {delivery.map((item, index) => {
              const send = `${new Date(item.hourSend).getHours()}h ${new Date(item.hourSend).getMinutes()}m`;
              const hDelivered = `${new Date(item.hourDelivered).getHours()}h ${new Date(item.hourDelivered).getMinutes()}m`;
              console.log(send, hDelivered)
              console.log(hmh.diff(send, hDelivered).toString())
              return (
                <div key={index}>
                  </div>
                 
              )
            }

            )
            }

        </section>
      </section>
    </>

  );
}
export default Kitchen;  