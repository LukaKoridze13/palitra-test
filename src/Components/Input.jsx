import React from 'react';
import '../CSS/input.scss';
export default function Input(props) {
    return (
        <div className="inputBox">
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} type={props.type} onChange={props.onChange} placeholder={props.placeholder} />
            <p className="error">{props.error}</p>
        </div >
    )
}
