import React from 'react'
import styled from 'styled-components'
import Signup from './Signup'
import Login from './Login'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  console.log('Navbar ---- ' + props.auth.isAuthenticated);
  const navAuth = !props.auth.isAuthenticated ? (
    <Layout>
      <NavTitle
        to='/'
      >CodeWars</NavTitle>
      <SignUp
        onClick={() => props.openModal('signup')}
      >
        Signup
    </SignUp>
      <LogIn
        onClick={() => props.openModal('login')}
      >
        Login
    </LogIn></Layout>
  ) : (
      <Layout>
        <NavTitle
          to='/'
        >CodeWars</NavTitle>
        <NavChallenge
          to='/challenge'
        >Random</NavChallenge>
        <Logout onClick={() => props.logout()}>Logout</Logout>
      </Layout>
    )

  return (
    <div>
      {navAuth}
      <Login
        username={props.input.username}
        password={props.input.password}
        openModal={props.openModal}
        closeModal={props.closeModal}
        signin={props.signin}
        login={props.login}
        showModal={props.modalReducer.login}
        message={props.modalReducer.message}
        addText={props.addText}
      />
      <Signup
        username={props.input.username}
        password={props.input.password}
        email={props.input.email}
        openModal={props.openModal}
        closeModal={props.closeModal}
        signup={props.signup}
        showModal={props.modalReducer.signup}
        message={props.modalReducer.message}
        addText={props.addText}
      />
    </div>
  )
}

export default Navbar

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 20em 1fr 1fr;
  grid-row: 1;
  min-height: 75px;
`

const Title = styled.div`
    grid-column: 1;
    background: lightgrey;
    font-size: 30px;
`

const SignUp = styled.button`
    grid-column: 3;
    background: lightblue;
    font-size: 30px;
`

const LogIn = styled.button`
    grid-column: 4;
    background: red;
    font-size: 30px;
`

const Logout = styled.button`
  grid-column: 4;
  background: green;
  font-size: 30px;
`
const NavTitle= styled(Link)`
  grid-column: 1;
  cursor: pointer;
  text-decoration: none;
  background: lightgrey;
  font-size: 50px;
`
const NavChallenge= styled(Link)`
  grid-column: 3;
  cursor: pointer;
  text-decoration: none;
  background: royalblue;
  font-size: 30px;
`
