import './components/styles.css';
import Saloon from './Pages/Saloon';
import Kitchen from './Pages/Kitchen'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <nav>
        <div className="nav-wrapper">
          <ul className="ul">
            <li>
              <Link to="/">Salão</Link>
            </li>
            <li>
              <Link to="/Kitchen">Cozinha</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/" component={Saloon} />
          <Route path="/Kitchen" component={Kitchen} />
        </Switch>
      </nav>
    </Router>
  );
}



// import React, { useState, useEffect } from 'react';
// import './components/styles.css';
// import Breakfast from './components/Breakfast.js';
// import AllDay from './components/AllDay.js';
// import Logo from './components/BurgerQueen.js';
// import firebase from './firebase'
// import MenuItem from './components/MenuItem'
// // import Order from './components/Order';

// const App = () => {
//   document.title = `Burger Queen`;
//   const [pedidos, setPedidos] = useState([]);
//   const [items, setItems] = useState([])
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     firebase.firestore().collection('menu').get().then((snap => {
//       const getMenu = snap.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data()
//       }))
//       setItems(getMenu);
//     })
//     )
//   }, [])
//   const addItem = (item) => {
//     if (!pedidos.includes(item)) {
//       item.count = 1
//       setPedidos([...pedidos, item])

//     } else {
//       item.count += 1
//       setPedidos([...pedidos])
//     }
//     setTotal(total + (item.price));
//     console.log(total)
//   }

//   return (
//     <div className="app">
//       <Logo />
//       <h3 className="text">Menu</h3>
//       <Breakfast items={items} onClick={addItem} />
//       <AllDay items={items} />
//       <h1>Order</h1>
//       <li className="section order">
//         <ul>{pedidos.map(pe => <MenuItem key={pe.id} name={pe.name} price={pe.price} qtd={pe.count} />)}
//           <p>Total:{pedidos.map(pe => pe.price * pe.count + ',00')} </p></ul>
//       </li>
//     </div>
//   );
// }

// export default App;