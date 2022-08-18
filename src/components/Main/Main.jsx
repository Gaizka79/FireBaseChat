import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "./Home/Home";
//import Login from "./Login/Login";
//import Register from "./Register/Register";

function Main () {
  return (
    <main className="main">
      <Routes>
        <Route element={<Home/>} path='/'/>
        {/* <Route element={<Login/>} path='/Login/'/> */}
      </Routes>
    </main>
  )
}

export default Main;