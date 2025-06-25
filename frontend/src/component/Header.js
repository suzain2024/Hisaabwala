// NavbarComponent.js
//this shows the navbar with title Expense Management system
import React,{useCallback,useEffect,useState} from 'react';//for state management,for navigation to certain page
import {Navbar,Nav,Button} from"react-bootstrap";
import "./style.css";
import {useNavigate} from "react-router-dom";//if user is already logged in then go to,else if logged out then got to login page
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
const Header=()=>{
    const navigate=useNavigate();//navigate the page to login
    const handleShowLogin=()=>{
        navigate("/login");
    }
    const [user,setUser]=useState(); //hook for setting the user
    useEffect(()=>{
        if(localStorage.getItem("user")) //if user exists
        {
            const user=JSON.parse(localStorage.getItem("user"));//then get the user
            setUser(user);//now set the user
        }
    },[]);
    const handleShowLogout=()=>{
        localStorage.removeItem("user");//if user want to logout then remove the  user from local storage and now go to login page
        navigate("/login");
    }
    const particlesInit=useCallback(async(engine)=>{
await loadFull(engine);
    },[]);
    const particlesLoaded=useCallback(async(container)=>{
        
    },[]);
    return (
    <>
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: '#000',
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: '#ffcc00',
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 3,
              random: { enable: true, minimumValue: 1 },
            },
            links: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 2,
            },
            life: {
              duration: {
                sync: false,
                value: 3,
              },
              count: 0,
              delay: {
                random: {
                  enable: true,
                  minimumValue: 0.5,
                },
                value: 1,
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
    <Navbar className="navbarCSS" collapseOnSelect expand="lg" style={{position: 'relative', zIndex: "2 !important"}}>
      {/* <Navbar className="navbarCSS" collapseOnSelect expand="lg" bg="dark" variant="dark"> */}
        <Navbar.Brand href="/" className="text-white navTitle">Expense Management System</Navbar.Brand>
        <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
          >
            <span
              className="navbar-toggler-icon"
              style={{
                background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
              }}
            ></span>
          </Navbar.Toggle>
        <div>
        <Navbar.Collapse id="responsive-navbar-nav" style={{color: "white"}}>
          {user ? (
            <>
            <Nav>
                <Button variant="primary" onClick={handleShowLogout} className="ml-2">Logout</Button>
              </Nav>
            </>
          ) : (

            <>
              <Nav>
                <Button variant="primary" onClick={handleShowLogin} className="ml-2">Login</Button>
              </Nav>
            </>
          )}
          
        </Navbar.Collapse>
      </div>
      </Navbar>
      </div>
    </>
  );
};


export default Header;