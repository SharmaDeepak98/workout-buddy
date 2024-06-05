import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import icon from '../assets/workoutbuddy.png'

const Navbar = () => {
  return (

    <header>
        <div className='container'>
            <Link to='/'>
              <img src={icon} ></img>

            </Link>
        </div>
    </header>
  )
}

export default Navbar