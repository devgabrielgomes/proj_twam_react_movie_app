import React, { useEffect, useState } from 'react';
import './styles/App.css';
import Mylist from "./pages/Mylist"
import Home from "./pages/Home"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mylist" element={<Mylist />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
