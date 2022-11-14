import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Apple from './components/componentApi/Apple';
import Busniss from './components/componentApi/Busniss';
import Teach from './components/componentApi/Teach';
import Tesla from './components/componentApi/Tesla';
import WallStream from './components/componentApi/WallStream';
import Add from './components/componentsForNewsUser/Add';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import PeopleNews from './components/componentsForNewsUser/PeopleNews';
 




function App() {
  let [userData, setUserData] = useState(null);
  let navigate = useNavigate();
  function setUserToken() {
    let token = localStorage.getItem("token");
    setUserData(jwtDecode(token));
  }
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setUserToken();
    } else {
      navigate("/login");
    }
  }, []);
  function logOut() {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/login");
  }
  
  //  console.log(  jwtDecode(localStorage.getItem('token')).user._id);


  return <>
  <Navbar  user={userData}  token={setUserToken} log={logOut}/>
 
  <Routes>
 <Route path='/login' element={  <Login/>}/>
 <Route path='/register' element={  <Register/>}/>
 <Route path='/apple' element={<Apple/>}/>
 <Route path='/busniss' element={<Busniss/>}/>
 <Route path='/teach' element={<Teach/>}/>
 <Route path='/tesla' element={<Tesla/>}/>
 <Route path='/wallStream' element={<WallStream/>}/>
 <Route path='/home' element={<Home/>}/>
 <Route path='/add' element={<Add/>}/>
 <Route path='/PeopleNews' element={<PeopleNews/>}/>

 <Route path='/' element={<Register/>}/>
 {/* <Route path='*' element={<h1 className=' mt-5 pt-5 fw-bolder'>Not found</h1>}/> */}

 


 


  </Routes>
 
  
  
  </>
}

export default App;
