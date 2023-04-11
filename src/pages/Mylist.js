import React, { useEffect, useState } from 'react';
import '../styles/MyList.css';
import NavbarComponent from "../components/NavbarComponent"
import ListMovie from "../components/ListMovie"
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from "framer-motion/dist/framer-motion";
import axios from 'axios';
import { ToastContainer as TostifyToastContainer, toast } from 'react-toastify';

const LIST_API = `https://api.themoviedb.org/3/list/8209568?api_key=${process.env.REACT_APP_TMDB_KEY}`
const REMOVE_API = `https://api.themoviedb.org/3/list/8209568/remove_item?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${process.env.REACT_APP_TMDB_SESSION_ID}`

const Mylist = () => {
    const [listMovies, setMovies] = useState([])

    useEffect(() => {
        getMovies(LIST_API)
    }, [])

    const getMovies = async () => {
        await fetch(LIST_API)
            .then(res => res.json())
            .then(data => {
                if (!data.errors) {
                    console.log(data);
                    setMovies(data.items)
                } else {
                    setMovies([])
                }
            });
    }

    // const removeMovie = async (movie_id, movie_title = "Movie") => {
    //     const data = { "media_id": movie_id };

    //     await fetch(REMOVE_API, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log('Success:', data);
    //             setMovies(listMovies.filter(movie => movie.id !== movie_id))
    //             toast.error(`You just removed "${movie_title ? movie_title : "Gorr the God Butcher"}" from your list!`, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "dark",
    //             });
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //             toast.error(`Error: ${error}`, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "dark",
    //             });
    //         });
    // }


    function removeMovie(movie_id, movie_title = "Movie") {
        const data = { "media_id": movie_id };
        axios.post(REMOVE_API, data)
            .then(() => {
                getMovies()
                toastSuccess(`You just removed "${movie_title ? movie_title : " a movie "}" from your list!`)
            })
            .catch(({ response }) => {
                toastError(`Unable to remove "${movie_title ? movie_title : " a movie "}" from your list!`)
            })
    }


    /**
     * Display a success toast with a specific message
     * @param message
     */
    function toastSuccess(message) {
        toast.success(`${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    /**
     * Display an error toast with a specific message
     * @param message
     */
    function toastError(message) {
        toast.error(`${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }


    return (
        <>
            <NavbarComponent />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
                <div className="title-mylist">
                    <h1>My list</h1>
                </div>

                {
                    listMovies.length > 0
                        ?
                        <div className="movie-container">
                            {listMovies.length > 0 && listMovies.map(movie => (
                                <>
                                    <ListMovie key={movie.id} movie={movie} removeMovie={removeMovie} />
                                </>
                            ))}
                        </div>
                        :
                        <h1 className="no-movies">You don't have any movies in your list!</h1>
                }


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

export default Mylist