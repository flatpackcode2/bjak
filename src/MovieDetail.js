import React from "react";

class MovieDetails extends React.Component{
    constructor(props){
        super(props)
        this.state={
            movie : null
        }
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