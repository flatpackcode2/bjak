import React from "react";
import axios from "axios";
import {
    Row, Col, Container, Button
} from 'reactstrap';
import loader from "./assets/loader.gif";
import volume from "./assets/volume.svg";
import subtitles from "./assets/subtitles.svg";
import clock from "./assets/clock.svg"
import play from "./assets/play.svg"

import './MovieDetail.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MovieDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: null
        }
    }

    componentDidMount() {
        axios.get(`https://cdn-discover.hooq.tv/v1.2/discover/titles/${this.props.match.params.id}`)
            .then(response => {
                let content = response.data.data
                this.setState({ content: content })
                console.log(this.state.content)

            }).catch(error => {
                console.log(error)
            })
    }

    render() {
        const { content } = this.state
        return (
            <>
                {
                    content ?
                        <Container className="text-light">
                            <Row className="justify-content-center mt-5">
                                <Col lg={4} md={6} sm={12}>
                                    <img className="rounded shadow" width="300px" src={content.images[0].url} />
                                </Col>
                                <Col lg={8} md={6} sm={12}>
                                    <div>
                                        <h4 className='text-left'>{content.title}</h4>
                                        <br />
                                        {content.audios.length > 0 ? <h6 className='text-left'><img style={{ height: '1.5rem' }} src={volume} /> {content['audios'].join(', ')}</h6> : null}
                                        {content.languages.length > 0 ? <h6 className='text-left'><img style={{ height: '1.5rem' }} src={subtitles} /> {content['languages'].join(', ')}</h6> : null}
                                        <h6 className='text-left'><img style={{ height: '1.5rem' }} src={clock} /> {content.running_time_friendly}</h6>
                                    </div>
                                    <br />
                                    <div className="d-flex justify-content-flex-start">

                                        <Button color="danger" style={{ alignSelf: 'start' }}><img style={{ height: '1.5rem' }} src={play} /> Watch now</Button>
                                    </div>
                                    <hr />
                                    <div>

                                        <h5 className='text-left'>Description</h5>
                                        <p className='text-left'>{content.description}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        : <img src={loader} />
                }
            </>
        )
    }

}
export default MovieDetails;