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


const App = () => {

  const [ input, setInput ] = useState('');
  const [ inputN, setInputN ] = useState(0);
  
  const handleSubmit = () => {
      console.log(input, inputN)
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
         <Button
              className="btn-cozinha" onClick={handleSubmit}>Enviar para cozinha
          </Button>

     </div>
    </section>
    
    </>
  );



}
export default App;
































// import Order from './pages/order';
// import Kitchen from './pages/kitchen';
// import PrivateRoute from './components/PrivateRoute';
// import { AuthProvider } from "./components/Auth";

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <header className="App-header">
//             <img className="App-logo" src={logo} alt="Burger Queen" />
//           </header>
//           <div>
//             <Route exact path="/" component={Auth} />
//             <PrivateRoute path="/order" component={Order} />
//             <PrivateRoute path="/kitchen" component={Kitchen} />
//           </div>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
