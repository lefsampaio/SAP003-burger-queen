
import React from "react";

const Select = (props) => (
  <div className='h2'>
    <label className='text' htmlFor={props.id}>{props.title}: </label>
    <select className={props.className} onChange={props.onChange} defaultValue="Departamento">
      <option disabled>Departamento</option>
      <option value="saloon">Salão</option>
      <option value="kitchen">Cozinha</option>
    </select>
  </div>
);

export default Select;