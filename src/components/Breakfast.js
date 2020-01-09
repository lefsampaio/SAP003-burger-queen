import React from 'react';
import './styles.css';
import MenuItem from './MenuItem.js';

const Breakfast = (props) => {
  return (
    <>
      <section className="section-cafe">
        <h2 className="text">Café da manhã</h2>
        <div className="section">
          {props.items.map((item) => item.breakfast === true ? <MenuItem key={item.id} name={item.name} price={item.price} onClick={() => props.onClick(item)} /> : false)}
        </div>
      </section>
    </>
  )
}

export default Breakfast;