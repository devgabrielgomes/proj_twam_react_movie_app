import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import '../styles/MovieInfo.css';
import axios from 'axios'
import NavbarComponent from "../components/NavbarComponent"
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import YouTube from "react-youtube"
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion/dist/framer-motion";
import ToastContainer from 'react-bootstrap/ToastContainer'
import star from "../images/star.png";
import { ToastContainer as TostifyToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MovieInfo() {
    let params = useParams();
    let movieId = params.id
    const MOVIE_API = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    const IMG_API = `https://image.tmdb.org/t/p/w1280`
    const TRAILER_API = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    const LIST_API = `https://api.themoviedb.org/3/list/8209568?api_key=${process.env.REACT_APP_TMDB_KEY}`
    const REMOVE_LIST_API = `https://api.themoviedb.org/3/list/8209568/remove_item?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${process.env.REACT_APP_TMDB_SESSION_ID}`
    const ADD_LIST_API = `https://api.themoviedb.org/3/list/8209568/add_item?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${process.env.REACT_APP_TMDB_SESSION_ID}`
    const CREDITS_API = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    const [movieInfo, setMovieInfo] = useState({})
    const [playTrailer, setPlayerTrailer] = useState(false)
    const [moviesInList, setMoviesInList] = useState([])
    const [movieGenres, setMovieGenres] = useState([])
    const [actorsInMovie, setActorsInMovie] = useState([])
    const [movieRoles, setMovieRoles] = useState([])
    const [movieActorsPhoto, setMovieActorsPhoto] = useState([])
    const [show, setShow] = useState(false);

    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const handleCloseRemoveModal = () => setShowRemoveModal(false);
    const handleShowRemoveModal = () => setShowRemoveModal(true);

    useEffect(() => {
        getMovieData(MOVIE_API)
        getListData(LIST_API)
        getTrailerData(LIST_API)
        getCreditsData(CREDITS_API)
    }, [])


    /**
     * GET request to set movie data
     * @async
     * @param MOVIE_API
     * @returns {Promise<void>}
     */
    async function getMovieData(MOVIE_API) {
        await fetch(MOVIE_API)
            .then(res => res.json())
            .then(data => {
                var tempMovieGenresArray = []
                for (let i = 0; i < data.genres.length; i++) {
                    tempMovieGenresArray[i] = data.genres[i].name
                }
                setMovieInfo(data)
                setMovieGenres(tempMovieGenresArray)
            })
    }

    var hoursAndMinutes = parseInt(movieInfo.runtime / 60) + "h " + movieInfo.runtime % 60 + "m"

    /**
     * GET request to set list data
     * @async
     * @param LIST_API
     * @returns {Promise<void>}
     */
    async function getListData(LIST_API) {
        await fetch(LIST_API)
            .then(res => res.json())
            .then(data => {
                setMoviesInList(data.items)
            })
    }

    /**
     * GET request to set roles data
     * @async
     * @param ROLE_API
     * @returns {Promise<void>}
     */
    async function getCreditsData(ROLE_API) {
        await fetch(ROLE_API)
            .then(res => res.json())
            .then(data => {
                var actors_name = [], movie_roles = [], actor_pic = [];
                for (let k = 0; k < 4; k++) {
                    actors_name[k] = data.cast[k].name;
                    movie_roles[k] = data.cast[k].character;
                    actor_pic[k] = IMG_API + data.cast[k].profile_path;
                }
                setActorsInMovie(actors_name)
                setMovieRoles(movie_roles)
                setMovieActorsPhoto(actor_pic)
            })
    }

    //Trailer Data
    async function getTrailerData() {
        await fetch(`${TRAILER_API}/${movieId}`)
            .then(res => res.json())
            .then(data => {
                setPlayerTrailer(data)
            })
    }

    // Transform movie runtime to hours and minutes
    const release_date = String((movieInfo.release_date)).substring(0, 4)

    // Set the trailer information
    let trailer_key = "";
    try {
        trailer_key = playTrailer.results[0].key
    } catch (error) {
        trailer_key = ""
    }

    const opts = {
        height: '562',
        width: '1000',
    }

    /**
     * DELETE request to remove a specific movie from the list
     */
    function removeMovie(id) {
        const data = { "media_id": id };
        axios.post(REMOVE_LIST_API, data)
            .then(() => {
                getListData(LIST_API)
                handleCloseRemoveModal()
                toastSuccess(`You just removed "${movieInfo.title}" from your list!`)
            })
            .catch(({ response }) => {
                toastError(`Unable to remove "${movieInfo.title}" from your list!`)
            })
    }

    /**
     * POST request to add a specific movie to the list
     */
    function addMovieToList(movie_id) {
        const data = { "media_id": movie_id };
        axios.post(ADD_LIST_API, data)
            .then(() => {
                getListData(LIST_API)
                toastSuccess(`You just added "${movieInfo.title}" to your list!`)
            })
            .catch(({ response }) => {
                toastError(`Unable to add "${movieInfo.title}" to your list!`)
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
                className="wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <img className="background" src={IMG_API + movieInfo.backdrop_path} alt="">
                </img>
                <div className="movieinfo">
                    <Row className="movie--information">
                        <Col className="movie-poster-col" xs={12} md={4} lg={4} xxl={4} align="center">
                            <img className="movieinfo-poster" src={movieInfo.poster_path ? IMG_API + movieInfo.poster_path : "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"} alt={movieInfo.title} />
                        </Col>
                        <Col className="movieinfo-col" xs={12} md={8} xxl={8}>
                            <Row>
                                <Col className="movie-title-year" md={9} sm={10} xs={8} xxl={10}>
                                    <h1>{movieInfo.title ? movieInfo.title : movieInfo.name}</h1>
                                    <span className="movieinfo--release">{release_date}</span>
                                </Col>
                                <Col className="movie-list-button" sm={2} xs={4} xxl={2}>
                                    {moviesInList.find(mil => mil.id === movieInfo.id) ?
                                        <motion.div
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {<Button className="movie-list-button-option" variant="outline-danger" id="btn-remove-movie" onClick={handleShowRemoveModal}>
                                                <FontAwesomeIcon icon={solid('trash-alt')} /> Remove from my list
                                            </Button>}
                                        </motion.div>
                                        :
                                        <motion.div
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {<Button className="movie-list-button-option" variant="outline-success" id="btn-add-movie" onClick={() => addMovieToList(movieId)}>
                                                <FontAwesomeIcon icon={solid('folder-plus')} /> Add to my list
                                            </Button>}
                                        </motion.div>
                                    }
                                </Col>
                            </Row>
                            <Row className="movie-details">
                                <Row>
                                    <div className="info-rating">
                                        <h2>{String(movieInfo.vote_average).substring(0, 3)}</h2>
                                        <img className="info-rating-img" src={star} alt="star" />
                                    </div>
                                    <span className="movie--genres">{movieGenres.join(', ')}</span><br></br>
                                    <span className="runtime">{hoursAndMinutes}</span>
                                </Row>
                                <Row className="synopsis">
                                    <div>
                                        <h5 className="synopsis-title">Synopsis</h5>
                                        <span className="synopsis--text">{movieInfo.overview}</span>
                                    </div>
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <div className="movieinfo-extra">
                    <Row className="movieinfo-extra-row">
                        <Col className="main-actors" xxl={3} xl={2} lg={3} md={3}>
                            <Row>
                                <h3 className="title-actors">Main Actors</h3>
                            </Row>
                            <Row>
                                <Col>
                                    <Row className="actor-row">
                                        <Col>
                                            <Row className="actor-container">
                                                <img id="actor-pic" src={movieActorsPhoto[0]} alt={actorsInMovie[0]}></img>
                                            </Row>
                                            <Row>
                                                <span className="actor-name"><b>{actorsInMovie[0]}</b> <br></br> as {movieRoles[0]}</span>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row className="actor-container">
                                                <img id="actor-pic" src={movieActorsPhoto[1]} alt={actorsInMovie[1]}></img>
                                            </Row>
                                            <Row>
                                                <span className="actor-name"><b>{actorsInMovie[1]}</b> <br></br> as {movieRoles[1]}</span>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="actor-row">
                                        <Col>
                                            <Row className="actor-container">
                                                <img id="actor-pic" src={movieActorsPhoto[2]} alt={actorsInMovie[2]}></img>
                                            </Row>
                                            <Row>
                                                <span className="actor-name"><b>{actorsInMovie[2]}</b> <br></br> as {movieRoles[2]}</span>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row className="actor-container">
                                                <img id="actor-pic" src={movieActorsPhoto[3]} alt={actorsInMovie[3]}></img>
                                            </Row>
                                            <Row>
                                                <span className="actor-name"><b>{actorsInMovie[3]}</b> <br></br> as {movieRoles[3]}</span>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row >
                        </Col >
                        <Col xxl={9} xl={10} lg={9} md={9}>
                            <div className="trailer--container">
                                <Row>
                                    <h3 className="trailer">Trailer</h3>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="iframe-container">
                                            <YouTube videoId={trailer_key} opts={opts} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row >
                </div >
                <Modal className="my-modal" centered show={showRemoveModal} onHide={handleCloseRemoveModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to remove this movie from your list?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseRemoveModal}>
                            No
                        </Button>
                        <Button variant="btn btn-danger" onClick={() => removeMovie(movieInfo.id)}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </motion.div >

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

export default MovieInfo