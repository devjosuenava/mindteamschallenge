import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "../styles/navbar.css"
import Logo from './Logo'

// Pages
import { CreateUser } from '../pages'

export default function Navbar(){
    const [ isNavExpanded, setIsNavExpanded ] = useState(false)
    return (
        <React.Fragment>
            <nav className='navigation'>
                <div className='navigation-logo'>
                    <Logo />
                </div>
                <Link to="/" className="brand-name">
                    Mind Teams Challenge
                </Link>
                <button className='hamburger' onClick={ () => { setIsNavExpanded(!isNavExpanded); } }>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="white"
                    >
                    <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                    </svg>
                </button>
                <div className={ isNavExpanded ? "navigation-menu expanded" : "navigation-menu" }>
                    <ul>
                        <li>
                            <Link to="/users" className="nav-link">
                                List Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/users/create" element={ <CreateUser />} className="nav-link">
                                Create User
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    )
}