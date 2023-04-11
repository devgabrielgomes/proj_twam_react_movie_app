import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom"
import Mylist from "../pages/Mylist"
import Home from "../pages/Home"
import MovieInfo from '../pages/MovieInfo';

import { AnimatePresence } from "framer-motion/dist/framer-motion";

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/my_list" element={<Mylist />} />
                <Route path="/movie_info/:id" element={<MovieInfo />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;
