import React from 'react';
import './styles.css';
import Button from './Button';

const MenuItem = (props) => {
    return (
        <>
            <Button class="menu-item" onClick={props.onClick}>
                <span className="menu-name menu-text">{props.name}</span>
                <span className="menu-price menu-text">R$ {props.price}</span>
                {
                    props.count
                    ? <span className="menu-price menu-text">Qtd: {props.count}</span>
                    : null
                }

            </Button>
        </>
    )
}

export default MenuItem;
