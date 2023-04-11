import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import Movie from "../components/Movie"
import MovieInfo from "./MovieInfo"
import NavbarComponent from "../components/NavbarComponent"
import "bootstrap/dist/css/bootstrap.min.css"
import { motion } from "framer-motion/dist/framer-motion";
import { ToastContainer as TostifyToastContainer, toast } from 'react-toastify';

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_TMDB_KEY}&page=1`
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=`

const Home = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getMovies(FEATURED_API)
    }, [])

    async function getMovies(API) {
        await fetch(API)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.results.length > 0) {
                    setMovies(data.results)
                } else {
                    toast.error(`The movie that you searched doesn't exists in our system!`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (searchTerm) {
            getMovies(SEARCH_API + searchTerm)
            setSearchTerm("")
        }
    }

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <NavbarComponent />
            <motion.div
                className='Home'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <div className="welcome--text">
                    <h1>Get all the information about movies.</h1>
                </div>

                <form className="search--bar" onSubmit={handleOnSubmit}>
                    <input
                        className="searchbar"
                        type="text"
                        placeholder="Search a movie..."
                        value={searchTerm}
                        onChange={handleOnChange}
                    />
                </form>
                <div
                    className="movie--container"
                    whiletap={{ scale: 0.9 }}
                >
                    {movies.length > 0 && movies.map(movie => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </div>
            </motion.div>
            <TostifyToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default Home;
