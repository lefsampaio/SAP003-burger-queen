import React from 'react';
import './styles.css';
import Button from './Button';

const ResumeItem = (props) => {
    return (
        <>
            <div className="menu-item">
                <span className="menu-name menu-text">{props.name}</span>
                <span className="menu-price menu-text">R$ {props.price}</span>
                {
                    props.count
                        ? <span className="menu-price menu-text">Qtd: {props.count}</span>
                        : null
                }

            </div>
            <Button onClick={props.onClick}>X</Button>
        </>
    )
}

export default ResumeItem;
