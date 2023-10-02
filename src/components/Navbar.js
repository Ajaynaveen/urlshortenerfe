import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
        <nav>
            <ul>
                <li>
                   <NavLink to="/">Home</NavLink>
               
                </li>
                <li>
                   <NavLink to="/signup">signup</NavLink>
               
                </li>
                <li>
                   <NavLink to="/login">login</NavLink>
               
                </li>
            </ul>
        </nav>

    </div>
  )
}

export default NavBar