import React, { useState, useContext } from 'react';
import {NavLink, useHistory} from 'react-router-dom'
import {
  Collapse,
  Navbar as Navbarlayout,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText
} from 'reactstrap';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }
  return (
    <div>
      <Navbarlayout color="dark" dark expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/create" exact className="nav-link">Create</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/links" exact className="nav-link">Links</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/" exact className="nav-link" onClick={logoutHandler}>Logout</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbarlayout>
    </div>
  );
}

export default Navbar;
