import React, { useEffect, useState } from 'react';
import firebase from '../firebase'
import '../components/styles.css';
import Button from '../components/Button'
// import notification from '../components/notification';

const Kitchen = () => {
  const [orders, getOrders] = useState([])
  const [orderdone, setOrderDone] = useState([])
  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('orders').get().then((snap => {
      const pedidos = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      getOrders(pedidos);
    })
    )
  }, [])



  const orderDone = (item) => {
    firebase
      .firestore().collection('orders').doc(item.id).update({
        status: 'done',
        hourDone: new Date().toLocaleString('pt-BR'),
      })
      .then(() => {
        setOrderDone([...orderdone, item])
      })

    if (item.status === 'done') {
      const index = orders.findIndex((i) => i.id === item.id)
      orders.splice(index, 1);
      // setDelivery([...delivery, item])
    }
  }

  const delivered = (item) => {
    firebase
      .firestore().collection('orders').doc(item.id).update({
        status: 'delivered',
        hourDelivered: new Date().toLocaleString('pt-BR'),
      })
      .then(() => {
        setDelivery([...delivery, item])
      })
    if (item.status === 'done') {
      const index = orderdone.findIndex((i) => i.id === item.id)
      orderdone.splice(index, 1);
      firebase
        .firestore().collection('orders').doc(item.id).delete()
        .then(() => {
          console.log('deletou')
        })
    }

  }
  return (
    <>
      <section className="root">
        <div className="app-kitchen">
          <h2 className="text">Kitchen</h2>
          <h2>Pedidos a serem feitos</h2>
          {orders.map(order => {
            return (
              <section className="section" key={order.id}  >
                <ul className="menu-item">
                  <li className="menu-name menu-text"> Cliente: {order.client}</li>
                  <li className="menu-name menu-text"> Mesa: {order.table}</li>
                </ul>
                <div className="order-div">
                  <span className="menu-name menu-text">Pedidos:</span>
                  {order.pedidos.map(p => <span className="menu-name" key={p.id}> {p.name} Qtd: {p.count} </span>)}

                  <Button class="btn-enviar burger-queen" onClick={() => orderDone(order)}>Pronto</Button>

                </div>

              </section>

            )
          })}
        </div>
        <section className="root">
          <div className="app-kitchen">
            <h2>Pronto para a Entrega</h2>
            {orderdone.map((item, index) => {
              return (
                <div key={index} >
                  {item.status === 'done' ?
                    <div>
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

        </section>
      </section>
    </>

  );
}
export default Kitchen;  