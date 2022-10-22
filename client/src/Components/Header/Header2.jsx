import React from 'react'
import './Header2.css'
import { NavLink } from 'react-router-dom';
import { Search } from './HeaderIcons.jsx';
const Header2 = () => {
    return (
        <header>
            <div className="IconContainer">

                <NavLink to="/" className={'logo'}>
                    <img src="https://th.bing.com/th/id/R.61eec9c54b363acf4fe8e9ca2aa08c2e?rik=g4%2fi0J7RPzmaOg&pid=ImgRaw&r=0" alt="#" className={'logo'} />
                </NavLink>
                <Search />
            </div>
            <nav>  <NavLink to="#" className={(status) => "link " + (status.isActive ? "active" : "")}>E-books</NavLink>
                <NavLink to="#" className={(status) => "link " + (status.isActive ? "active" : "")}>Institutes</NavLink>
                <NavLink to="#" className={(status) => "link " + (status.isActive ? "active" : "")}>Courses</NavLink>
                <NavLink to="#" className={(status) => "link " + (status.isActive ? "active" : "")}>PKR</NavLink>
                <NavLink to="#" className={(status) => "link " + (status.isActive ? "active" : "")}>English</NavLink>
                <NavLink to="#" className={(status) => "link " + (status.isActive ? "active" : "")}>Latest News</NavLink>
            </nav>
        </header>
    )
}

export default Header2