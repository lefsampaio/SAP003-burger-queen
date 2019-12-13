import React from 'react';
const Input = (props) => {
    return (
        <div className={props.class}>
            <label className={props.class} htmlFor={props.id}>{props.title}:</label>
            <input value={props.value} onChange={props.onChange} className={props.class} type={props.type} placeholder={props.placeholder} id={props.id}></input>
        </div>
    );
};
export default Input;