import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import '../CSS/posts.scss'
export default function Home() {
  const [posts, setPosts] = useState('Load')
  const [pages, setPages] = useState(0)
  const [users, setUsers] = useState(false)
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(20)
  function page() {
    let pagesN = []
    for (let i = 1; i <= pages; i++) {
      pagesN.push(<p key={`p-${i}`} onClick={() => { setMin(((i - 1) * 20) + 1); setMax(i * 20) }}>{i}</p>)
    }
    return pagesN
  }

  async function fetcher() {
    await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()).then((json) => {
      setUsers(json); 
    })
      
    fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()).then((json) => { setPosts(json); setPages(Math.ceil(json.length / 20));  })
  }
  useEffect(() => {
    fetcher()
  }, [])
  useEffect(()=>{
    console.log()
  })
  return (
    <section className="posts">
      <p></p>
      {typeof (posts) === 'object' ? <div className='box centerCol'>
        <div className='pages center' style={{ gap: '10px', cursor: 'pointer' }} >{page()}</div>
        {posts.map((post, index) => {
          if (min <= index + 1 && index + 1 <= max) {
            let author = users.find(user => user.id === post.userId)
            return <Card userId={post.userId} postId={post.id} title={post.title} key={post.id} author={author.name} />
          } else {
            return false
          }
        })}</div> : <h1>Loading Posts...</h1>}
    </section>
  )
}
