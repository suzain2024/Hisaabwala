//this component is basically loading animation which indicates user something is in progress i.e something is running in background
import React from 'react'
import logo from "../assets/loader.gif"
import {Container} from 'react-bootstrap'
const Spinner=()=>{
 return (
    <Container className="mt-5"  style={{position: 'relative', zIndex: 2 , display: "flex", alignItems: "center", justifyContent: "center"}}>
        <img className="mt-5" src={logo} alt="loading" width="250px" height="250px"/>
    </Container>
  )
}

export default Spinner