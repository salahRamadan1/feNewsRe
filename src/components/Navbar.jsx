import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar( {user ,log  }) {
let [number,setNumber] = useState([])
async function lenth(){

let {data} = await axios.get('http://localhost:2000/news/getAllNews')
setNumber( data.data.length)
}
 
 useEffect(()=>{
  lenth()
 },[])

  return (
    <>
      <nav className="navbar navbar-expand-lg navBar fixed-top  shadow-lg  ">
        <div className="container-fluid">
          <Link className="navbar-brand text-white logo" to={"home"}>
            <h2>
              <span className="text-black">S</span>{" "}
              <span className="text-white">L</span>{" "}
              <span className="text-danger">A</span>
            </h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to={"wallStream"}>
                  Wall streat
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to={"teach"}>
                  Tech crunch
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to={"busniss"}>
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to={"tesla"}>
                  Tesla
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white fw-bold" to={"apple"}>
                  Apple
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  {
                    user ? <Link id="saver" className="nav-link text-black fw-bold me-3" to={"add"}>
                    ADD NEWS
                  </Link>:''
                  }
               
              </li>  
             
           
              <li className="nav-item">
                {
                  user ? <Link id="saver2" className="nav-link text-black fw-bold" to={"PeopleNews"}>
                 <h6 className=" fw-bold me-3  position-relative">  PEOPLE'S NEWS   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger  " > {number}</span></h6>
                </Link> : ''
                }
                
              </li>
            </ul>
            <li className="nav-item dropdown   list-unstyled  me-5 pe-5 ">
              <a
                className="nav-link dropdown-toggle text-white"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Settings
              </a>
              <ul className="dropdown-menu">
                <li>
                  {
                    user ? '' :   <Link className="dropdown-item text-black" to={"register"}>
                    Register
                  </Link>
                  }
                
                </li>
                <li>
                  <Link className="dropdown-item text-black" onClick={log} to={"login"}>
                    Log in
                  </Link>
                </li>
                <li>
                  {
                    user ?    <Link onClick={log} className="dropdown-item text-black" to={"login"}>
                    logOut
                  </Link> :''
                  }
                   
                </li>
              </ul>
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}
