import React from 'react'
import {Nav,Navbar,Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

function Header() {
  return (
    <>
    <Navbar bg='dark' variant='dark' collapseOnSelect>
        <LinkContainer to="/">
        <Navbar.Brand>
            Ecommerce Layout
        </Navbar.Brand>
        </LinkContainer>
    </Navbar>
    </>
  )
}

export default Header