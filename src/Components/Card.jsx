import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Card(props) {
    let navigate = useNavigate()
    return (
        <div className="card">
            <h2 style={{color:'white'}} id='cardh2'>Author: <span onClick={() => { navigate(`/palitra-test/author/${props.author}`) }}>{props.author}</span></h2>
            <h1>{props.title}</h1>
            <p onClick={() => { navigate(`/palitra-test/post/${props.postId}`) }}>Go to details</p>
        </div>
    )
}
