import React, { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import allMenu from './Menu.js'

const Menu = ({ item }) => <ul className="mb-1 list-group"> <Button className="p-1 alert-info mb-2 list-group-item-action">{item.name}</Button><p>R${item.price}</p></ul>;
// const Form = ({ addClient }) => {
//   const [value, setValue] = useState("");

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (!value) return;
//     addClient(value);
//     setValue("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         className="input"
//         value={value}
//         onChange={e => setValue(e.target.value)}
//       />
//     </form>
//   );
// }

const App = () => {
  const [cart, setCart] = useState([])
  const [items, setItem] = useState(allMenu)

  const handleChange = event => {
    setItem(event.target.items);
  };
  const handleSubmit = event => {
    if (items) {
      setCart(items.concat(cart));
    }
    setItem('');
    event.preventDefault();
  };

  // const addClient = client => {
  //   const newTodos = [...clients, { client }];
  //   setClients(newTodos);
  // }

  return (
    <section className="app">
      <div className="list">
        <p className="m-1">Acompanhamentos</p>
        {items.sideDish.map((item) => (
          <Menu
            item={item}
          />
        ))}
      </div>
      <div className="list">
        <p className="m-1">Bebidas</p>
        {items.beverage.map((item) => (
          <Menu
            item={item}
          />
        ))}
      </div>
      <div className="list">
        <p className="m-1">Adicionais</p>
        {items.extras.map((item) => (
          <Menu
            item={item}
          />
        ))}
      </div>
      <div className="list">
        <p className="m-1">Burgers</p>
        {items.burgers.map((item) => (
          <Menu
            item={item}
          />
        ))}
      </div>
      <div className="list">
        <p className="m-1">Café Da Manhã</p>
        {items.breakfast.map((item) => (
          <Menu
            item={item}

          />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Add Item</button>
      </form>
      {/* <Form addClient={addClient} /> */}

    </section>
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
