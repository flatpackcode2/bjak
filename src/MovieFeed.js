import React from 'react';
import axios from 'axios';
import './MovieFeed.css';
import { Link, Route } from 'react-router-dom';
import Image from "react-graceful-image";
import loader from "./assets/loader.gif";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col, Container
} from 'reactstrap';

class MovieFeed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            feed: [],
            page: 1
        }
    }

    componentDidMount() {
        axios.get(`https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=${this.state.page}&perPage=20`)
            .then(response => {
                let initialFeed = response.data.data
                let manualCuration = []
                for (let i = 0; i < initialFeed.length; i++) {
                    if (initialFeed[i].type === "Multi-Title-Manual-Curation") {
                        manualCuration.push(initialFeed[i])
                    }
                }
                console.log(manualCuration)
                this.setState({ feed: manualCuration })
            })
            .catch(error =>{
                console.log(error)
            })
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount(){
        window.removeEventListener('scroll',this.handleScroll)
    }

    handleScroll = () =>{
        let ratio = Math.floor(window.scrollY/window.innerHeight)
        if(ratio!==this.page){
            this.setState({page:ratio})
        }
        console.log(ratio)
        console.log(this.state.page)
    }

    handleClick = e =>{
        e.preventDefault()


    }

    render() {
        const { feed } = this.state
        console.log(`feed:${feed['row_name']}`)
        return (
            <>
                {feed ? feed.map(elem => {
                    return (
                        <Container fluid="true" className="my-3">
                            <Row className="d-block" onScroll={this.handleScroll}>
                                <h2 className="text-light category-heading">{elem['row_name']}</h2>
                                <div className="super">
                                    <div className="parent">
                                        {elem['data'] ?
                                            elem['data'].map(subelem => {
                                                return (
                                                    <Card className="shadow m-1 rounded" onClick={this.handleClick}>
                                                        <Link to={`/titles/${subelem.id}`}><CardImg top src={subelem.images[0].url} alt="" /></Link>
                                                        <CardBody>
                                                            <CardTitle className="h6">{subelem.title}</CardTitle>
                                                        </CardBody>
                                                    </Card>
                                                )
                                            })
                                            : <img src={loader} />
                                        }

                                    </div>
                                </div>
                            </Row>
                        </Container>)
                }) : null}

            </>
        )
    }
}

export default MovieFeed;

//Use graceful image loading
//Use loading icon
//Use reactstrap

