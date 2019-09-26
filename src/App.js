import React from 'react';
import './App.css';
import MovieFeed from './MovieFeed.js';
import MovieDetail from './MovieDetail.js';
import { Switch, Route } from 'react-router-dom';
import Navigation from "./Navigation.js";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/" component={MovieFeed} />
        <Route path="/titles/:id" component={props => {
          return (
            <MovieDetail {...props} />
          )
        }} />
      </Switch>
    </div>
  );
}

export default App;
