import React, { useEffect, useState } from 'react';
import './styles/App.css';
import AnimatedRoutes from './components/AnimatedRoutes';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  return (
    <div className='App'>
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  )
}

export default App;
