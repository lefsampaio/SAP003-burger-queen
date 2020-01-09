import React from 'react';
import './styles.css';
import MenuItem from './MenuItem.js';

const AllDay = (props) => {
    return (
        <>
            <section>
                <h2 className="text">Menu All Day</h2>
                <div>
                    <span className="text">Acompanhamentos</span>
                    <span className="section">
                        {props.items.map((item) => item.type === "sideDish" ? <MenuItem key={item.id} name={item.name} price={item.price} onClick={() => props.onClick(item)} /> : false)}
                    </span>
                </div>
                <div>
                    <span className="text">Burgers</span>
                    <span className="section">
                        {props.items.map((item) => item.type === "burgers" ? <MenuItem key={item.id} name={item.name} price={item.price} onClick={() => props.onClick(item)} /> : false)}
                    </span>
                </div>

                <div>
                    <span className="text">Bebidas</span>
                    <span className="section">
                        {props.items.map((item) => item.type === "beverage" ? <MenuItem key={item.id} name={item.name} price={item.price} onClick={() => props.onClick(item)} /> : false)}
                    </span>
                </div>
                <div>
                    <span className="text">Extras</span>
                    <span className="section">
                        {props.items.map((item) => item.type === "extra" ? <MenuItem key={item.id} name={item.name} price={item.price} onClick={() => props.onClick(item)} /> : false)}
                    </span>
                </div>
            </section>
        </>
    )
}

export default AllDay;