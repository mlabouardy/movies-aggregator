import React from 'react';
import Searchbar from './components/Searchbar/Searchbar.js';
import Movie from './components/Movie/Movie.js';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      movies: []
    }
    this.getMovies = this.getMovies.bind(this);
    this.getMovies('Marvel');
  }

  getMovies(query) {
    fetch('https://api.themoviedb.org/3/search/movie?api_key=63e6513afcf3185b695c8bb57f1e49c3&include_adult=false&query=' + query)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ movies: data.results });
      });
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <Searchbar handleKeyStore={this.getMovies} />
            {this.state.movies.map((movie, index) => (
              <>
                <Movie movie={movie} />
              </>
            ))}
          </div>
        </div>
      </>
    );
  }

}

export default App;
