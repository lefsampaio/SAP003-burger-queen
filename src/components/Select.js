
import React from "react";

const Select = (props) => (
  <select className={props.className} onChange={props.onChange} defaultValue="Departamento">
    <option disabled>Departamento</option>
    <option value="saloon">Salão</option>
    <option value="kitchen">Cozinha</option>
  </select>
);

export default Select;