import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import '../CSS/poster.scss'
export default function Post() {
  let { id } = useParams()
  const [posts, setPosts] = useState('no')
  const [users, setUsers] = useState('no')
  const [comments, setComments] = useState('no')
  const [show, setShow] = useState(Number(id) + 1)
  const [post, setPost] = useState('no')
  const [author, setAuthor] = useState('no')
  const [com, setCom] = useState('no')
  const [num, setNum] = useState(2)
  const [shown, setShown] = useState(0)
  let ref = useRef()
  async function fetcher() {
    let posta;
    await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(json => {
      let found = json.filter(post => post.id >= id)
      let real = json.find(posta => Number(posta.id) === Number(id))
      setPosts(found)
      setPost(real)
      posta = real;
    })
    await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then(json => {
      setUsers(json)
      let real = json.find(user => user.id === posta.userId)
      setAuthor(real)
    })
    await fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json()).then(json => {
      let coms = json.filter(co => Number(co.postId) === Number(id))
      setCom(coms)
      setComments(json)

    })
  }
  function scroll() {
    let po = ref.current.children[shown].getBoundingClientRect()
    if (po.y + po.height < window.innerHeight + 30) {
      setShow(show + 1)
      setShown(shown + 1)
      window.history.replaceState(null, null,  show);
    }
  }

  useEffect(() => {
    fetcher()
    if (show <= 100) {
      document.addEventListener('scroll', scroll)
    }
    return (() => {
      if (show <= 100) {
        document.removeEventListener('scroll', scroll)
      }
    })
  },[show,])
  return (
    <>
      {comments === 'no' ? <h1 style={{ color: 'white' }}>Loading...</h1> : <div className='poster'>
        <div className="realPost" key={author.email} style={{ width: '90vw', maxWidth: '400px', marginBottom: '50px', backgroundColor: 'white', padding: '15px' }}>
          <h1>{post.title.toUpperCase()}</h1>
          <h6 style={{ marginTop: '15px' }}>{post.body}</h6>
          <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
            From: {author.name} | {author.email}
          </p>
          <div className="comments">
            <p style={{ marginTop: '30px' }}>Comments:</p>
            {com.map((c, index) => {
              if (index + 1 <= num) {
                return <p key={c.email} style={{ margin: '10px 0px', border: '2px solid black', padding: '10px', width: '100%' }}>Title: -<span style={{ fontWeight: 'bold' }}>{c.name}</span> - {c.body} - <span style={{ fontWeight: 'bold' }}>From: {c.email}</span></p>
              } else {
                return false
              }
            })}
            <p style={{ cursor: 'pointer' }} onClick={(e) => {
              if (e.target.innerText === 'Show all comments') {
                e.target.innerText = "Hide comments"
                setNum(com.length)
              } else {
                e.target.innerText = "Show all comments"
                setNum(2)
              }
            }}>Show all comments</p>
          </div>
        </div>
        <div className="otherPosts" ref={ref} style={{ background: 'transparent' }}>
          {
            posts.map((post) => {
              if (Number(id) < Number(post.id) && Number(post.id) <= Number(show)) {
                let com = comments.filter(coma => coma.postId === post.id)
                let author = users.find(usa => usa.id === post.userId)
                return <div key={author.email + "fef" + post.id} className="realPost" style={{ backgroundColor: 'white', width: '90vw', maxWidth: '400px', padding: '15px', marginBottom: '50px' }}>
                  <h1>{post.title.toUpperCase()}</h1>
                  <h6 style={{ marginTop: '15px' }}>{post.body}</h6>
                  <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
                    From: {author.name} | {author.email}
                  </p>
                  <div className="comments">
                    <p style={{ marginTop: '30px' }}>Comments:</p>
                    {com.map((c, index) => {
                      if (index + 1 <= num) {
                        return <p key={c.email} style={{ margin: '10px 0px', border: '2px solid black', padding: '10px', width: '100%' }}>Title: -<span style={{ fontWeight: 'bold' }}>{c.name}</span> - {c.body} - <span style={{ fontWeight: 'bold' }}>From: {c.email}</span></p>
                      } else {
                        return false
                      }
                    })}
                    {/* <p style={{ cursor: 'pointer' }} onClick={() => { navigate(`/palitra-test/post/${post.id}`)}}>Go to details</p> */}
                  </div>
                </div>
              }else{
                return false
              }
            })
          }
        </div>
      </div>}
    </>
  )
}
