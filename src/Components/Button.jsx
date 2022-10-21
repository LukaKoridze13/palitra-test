import React from 'react'
import '../CSS/button.scss'
export default function Button(props) {
  return (
    <button className='submit-button' type='submit'>{props.text}</button>
  )
}
