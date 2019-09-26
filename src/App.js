import React from 'react';
import './App.css';
import MovieFeed from './MovieFeed.js'
import MovieDetail from './MovieDetail.js'
import {Switch, Link, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <switch>
        <Route exact path="/" component={MovieFeed}/>
        <Route path="/:id" component={MovieDetail}/>
      </switch>
    </div>
  );
}

export default App;
