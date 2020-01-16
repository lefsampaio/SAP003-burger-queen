import React from 'react';
import './styles.css';
import MenuItem from './MenuItem.js';

const AllMenu = (props) => {
    return (
        <>
            <section className="section-cafe">
                <h2 className="text">{props.title}</h2>
                <div className="section">
                    {props.items.map((item) => item.type === props.type ? <MenuItem key={item.id} name={item.name} price={item.price} onClick={() => props.onClick(item)} /> : false)}
                </div>
            </section>
        </>
    )
}

export default AllMenu;