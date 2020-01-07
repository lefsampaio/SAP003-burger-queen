import React from 'react';
const Input = (props) => {
    return (
        <div className={props.class}>
            <label className='text' htmlFor={props.id}>{props.title}: </label>
            <input value={props.value} onChange={props.onChange} className='input-border' type={props.type} placeholder={props.placeholder} id={props.id}></input>
        </div>
    );
};
export default Input;