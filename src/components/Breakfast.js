import React from 'react';
import './styles.css';
import MenuItem from './MenuItem.js';

const Breakfast = (props) => {
  return (
    <>
      <h3 className="text">Café da manhã</h3>
      <section className="section">
        {props.items.map((item) => item.breakfast === true ? <MenuItem key={item.id} name={item.name} price={item.price} onClick={() => props.onClick(item)} /> : false)}
      </section>
    </>
  )
}

export default Breakfast;