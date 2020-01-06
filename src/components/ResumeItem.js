import React from 'react';
import './styles.css';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ResumeItem = (props) => {
    return (
        <>
            <div className="resume-item">
                <span className="menu-name menu-text">{props.name}</span>
                <span className="menu-price menu-text">R$ {props.price}</span>
                {
                    props.count
                        ? <span className="menu-price menu-text">Qtd: {props.count}</span>
                        : null
                }
                <Button class="remove-btn" onClick={props.onClick}><FontAwesomeIcon icon={faTrashAlt} /></Button>
            </div>

        </>
    )
}

export default ResumeItem;
