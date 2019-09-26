import React from "react";
import axios from "axios";

class MovieDetails extends React.Component{
    constructor(props){
        super(props)
        this.state={
            moviea: null
        }
    }

    componentDidMount(){
        axios.get( `https://cdn-discover.hooq.tv/v1.2/discover/titles/${this.props.match.params.id}`)
            .then(response =>{
                let details = response.data
                console.log(details.data)
            }).catch(error =>{
                console.log(error)
            })
    }

    render(){
        return(
            <>
                <h5>Whee I'm a movie</h5>
            </>
        )
    }

}
export default MovieDetails;