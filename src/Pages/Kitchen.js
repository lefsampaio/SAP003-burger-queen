import React, { useEffect, useState } from 'react';
import firebase from '../firebase'
// import MenuItem from '../components/MenuItem'
import '../components/styles.css';

function Kitchen() {
  const [orders, getOrders] = useState([])
  useEffect(() => {
    firebase.firestore().collection('orders').get().then((snap => {
      const pedidos = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      getOrders(pedidos);
      console.log(pedidos.map(i => i.client))
    })
    )
  }, [])

  return (
    <>
      <h2>Kitchen</h2>
      {/* {console.log(orders.map(order => order.pedidos))} */}
      {orders.map(order => {
        return (
          <section className="section">
            <div className="menu-item">
              <span className="menu-name menu-text">Cliente: {order.client} </span>
              <span className="menu-name menu-text">Mesa: {order.table}</span>
            </div>
            <div className="order-div">
              <span className="menu-name menu-text">Pedidos:</span>
              {order.pedidos.map(p => <span className="menu-name">{p.name} qtd: {p.count}</span>)}


            </div>

          </section>
        )
      })}
    </>

  );
}
export default Kitchen;  