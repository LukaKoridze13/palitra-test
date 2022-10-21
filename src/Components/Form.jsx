import React from 'react'
import '../CSS/form.scss'
export default function Form(props) {
    return (
        <form ref={props.form} onSubmit={(e) => { e.preventDefault(); props.onSubmit() }}>
            <h1>{props.title}</h1>
            {props.children}
        </form>
    )
}
