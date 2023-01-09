import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import Movie from "../components/Movie"
import NavbarComponent from "../components/NavbarComponent"
import "bootstrap/dist/css/bootstrap.min.css"

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3bf31c72f99e4189266c43358ac6e189&page=1"

const Home = () => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        getMovies(FEATURED_API)
    }, [])

    const getMovies = (API) => {
        fetch(API)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setMovies(data.results)
            })
    }

    return (
        <>
            <NavbarComponent />
            <div className='Home'>
                <div className="welcome--text">
                    <h1>Get all the information about movies.</h1>
                </div>
                <div className="movie--container">
                    {movies.length > 0 && movies.map(movie => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home;
