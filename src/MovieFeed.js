import React from 'react';
import axios from 'axios';
import './MovieFeed.css';
import {Link, Route} from 'react-router-dom';
import Image from "react-graceful-image";
import loader from "./assets/loader.gif";

class MovieFeed extends React.Component{

    constructor(props){
        super(props)
        this.state={
            feed:[],
            page:-1
        }
    }

    componentDidMount(){
        axios.get('https://cdn-discover.hooq.tv/v1.2/discover/feed?region=ID&page=1&perPage=20')
            .then(response =>{
                let initialFeed = response.data.data
                let manualCuration=[]
                for(let i = 0; i < initialFeed.length; i++ ){
                    if(initialFeed[i].type==="Multi-Title-Manual-Curation"){
                        manualCuration.push(initialFeed[i])
                    }
                }
                this.setState({feed : manualCuration})
            })
        console.log('componentMounted')
    }

    render(){
        console.log('render')
        const {feed} = this.state
        if(feed[0]){
            console.log(feed[0]['data']);
        }
        return(
            <>
                <h2>Upcoming Movies</h2>
                <div className="super">
                    <div className="parent">
                        {   feed[0]?
                            /* Map out every movie in first row to image divs */
                            feed[0]['data'].map( elem =>{
                                return(
                                    <>
                                    <div style={{margin:"2px"}}>
                                        <div className="imageContainer" height="300">
                                            <Link to="/:id">
                                                <Image width="200px" src={elem.images[0].url} retry={{count:10, delay:2}} noLazyLoad="true"/>
                                            </Link>
                                        </div>
                                        <p>{elem.title}</p> 
                                    </div>
                                    </>
                                )
                            }):<img src={loader}/>
                        }
                    </div>
                </div>
            </>
        )
    }        
}

export default MovieFeed;

//Use graceful image loading
//Use loading icon
//Use reactstrap

