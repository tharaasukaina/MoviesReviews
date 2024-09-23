import React, { useState, useEffect } from 'react';
import Navbar from './../Navbar/Navbar';
import Aboutt from './../Aboutt/Aboutt';
import Home from './../Home/Home';
import Login from './../Login/Login';
import People from './../People/People';
import Register from './../Register/Register';
import Movies from './../Movies/Movies';
import NotFound from './../NotFound/NotFound';
import Tv from './../Tv/Tv';
import Network from './../Network/Network';
import { Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function App() {
  let [loginUser, setLoginUser] = useState(null);

  function setUserData() {
    let token = localStorage.getItem('token');
    if (token) {
      let decoded = jwtDecode(token);
      setLoginUser(decoded);
      console.log(decoded);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUserData();
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='Home' element={<Home />} />
          <Route path='Login' element={<Login setUserData={setUserData} />} />
          <Route path='Movies' element={<Movies />} />
          <Route path='Network' element={<Network />} />
          <Route path='*' element={<NotFound />} />
          <Route path='People' element={<People />} />
          <Route path='Register' element={<Register />} />
          <Route path='Tv' element={<Tv />} />
        </Routes>
      </div>
    </>
  );
}
