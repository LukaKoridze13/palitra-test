import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../CSS/posts.scss'
import '../CSS/author.scss'
import Card from '../Components/Card'
export default function Author() {
    let { name } = useParams()
    const [posts, setPosts] = useState('load')
    const [user, setUser] = useState('load')
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then(json => {
            let found = json.find(user => user.name === name)
            setUser(found)
        })
        fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(json => {
            let found = json.filter(post => post.userId === user.id)
            setPosts(found)
        })
    }, [name,user.id])
    return (
        <>
            {user === 'load' ? <h1>Loading...</h1> : <div className="author centerCol">
                <h1>Name: {user.name}</h1>
                <p>@{user.username}</p>
                <h3>Email: {user.email}</h3>
                <h3>Address: {user.address.street} - {user.address.suite} - {user.address.city}, {user.address.zipcode}</h3>
                <h3>Phone: {user.phone}</h3>
                <h3>Website: <a target='_blank' rel="noreferrer" href={`https://${user.website}`}>{user.website}</a></h3>
                <h3>Company: {user.company.name}</h3>
            </div>}
            {posts === 'load' ? <h1>Loading...</h1> : <div className='box centerCol' style={{width:'100%'}}>
                {posts.map((post) => {
                    return <Card userId={post.userId} postId={post.id} title={post.title} key={post.id} author={user.name} />
                })}</div>
            }
        </>
    )
}
