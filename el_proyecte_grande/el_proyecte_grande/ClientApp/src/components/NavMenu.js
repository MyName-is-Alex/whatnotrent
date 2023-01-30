import React, {Component, useState} from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginMenu from './api-authorization/LoginMenu';
import './NavMenu.css';
import logo from '../images/Logo/png/logo-color-website.png';

const NavMenu = ({ isAuthenticated, onChangeAuthenticated}) => { 
    const [collapsed, setCollapsed] = useState();
    
    const toggleNavbar = () => {
      setCollapsed(!collapsed)
    }
    
    return (
        <header>
          <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow" container light>
            <NavbarBrand tag={Link} to="/" className={"d-flex"} style={{wordBreak: "keep-all"}}>
              <img
                  className={"shadow"}
                  style={{width: "100px", borderRadius: "10px"}}
                  alt="Whatnot Rent"
                  src={logo}/>
              <span className={"mx-3 align-self-center"}>Why Not Rent?</span>
            </NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/add-product">Rent it!</NavLink>
                </NavItem>
                <LoginMenu isAuthenticated={isAuthenticated} onChangeAuthenticated={onChangeAuthenticated} />
              </ul>
            </Collapse>
          </Navbar>
        </header>
    )
}

export default NavMenu;
