import {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from "./pages/SplashScreen.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {

    return (
       <Router>
           <Routes>
               <Route path="/" element={<SplashScreen/>} />
               <Route path="/home" element={<HomePage/>} />
               <Route path="/login" element={<LoginPage/>} />
               <Route path="/register" element={<RegisterPage/>} />
           </Routes>
       </Router>
    )
}

export default App
