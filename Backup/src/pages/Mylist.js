import React from "react";
import NavbarComponent from "../components/NavbarComponent"
import { Container, Row, Col, Button } from 'react-bootstrap';
import YouTube from "react-youtube"

const release_date = "2020"
const poster_path = "wwwwwewwffefewfewfewfew"
const title = "Minions: The Rise of Gru"
const resume = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae augue eu nunc interdum consectetur. In bibendum, nulla et pellentesque sagittis, ante felis pharetra sem, et pharetra ex odio mollis purus. Integer eu molestie tellus, sed ultricies augue. Quisque odio ipsum, gravida eget eleifend vel, commodo vitae leo. Praesent vulputate malesuada enim, non placerat neque efficitur ac. Nunc vel libero ac erat feugiat ullamcorper sed et turpis. Etiam placerat, nulla a pulvinar feugiat, mauris nulla finibus nisi, et mollis augue dui vel nibh. Fusce id dui ligula. In hac habitasse platea dictumst. Aenean molestie tortor id viverra hendrerit. Nunc eget hendrerit tortor. Praesent vitae fermentum lectus. Ut non auctor orci. Ut vitae urna augue. Etiam fringilla metus sed leo maximus, eget vestibulum eros interdum."
const IMG_API = "https://image.tmdb.org/t/p/w1280"
const background = "'https://image.tmdb.org/t/p/original/eSVvx8xys2NuFhl8fevXt41wX7v.jpg'"

const opts = {
    height: '500',
    width: '1000',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        volume: "0"
    }
}

//    const renderTrailer = () => {
//const trailer = selectedMovie.videos.results.find(vid => vid.name === 'Official Trailer')
//        return (
//            <YouTube>
//
//            </YouTube>
//        )
//    }

const Mylist = () => (
    <>
        <NavbarComponent />
        <div className="mylist">
            <Container className="movie--information">
                <Row>
                    <Col>
                        <img width="100px" height="100px" src="https://image.tmdb.org/t/p/w1280/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg" alt={title} />
                    </Col>
                    <Col xs={7}>
                        <div className="mylist--movieinfo">
                            <h1>{title}</h1>
                            <span>{release_date.substring(0, 4)}</span>
                            <h5 className="synopsis">Synopsis</h5>
                            <span className="synopsis--text">{resume}</span>
                        </div>
                    </Col>
                    <Col xs={2}>
                        <Button className="list--button" variant="outline-success">Add to my list</Button>
                    </Col>
                </Row>
                <div className="trailer--container">
                    <Row>
                        <Col>
                            <h2 className="trailer">Trailer</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <YouTube opts={opts}>

                            </YouTube>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    </>
)

export default Mylist