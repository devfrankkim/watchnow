import React from "react";
import axios from "axios";
import Movie from "./Movie";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts.mx/api/v2/list_movies.json&sort_by=rating"
    );
    this.setState({ isLoading: false, movies: movies });
    // console.log(movies);
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <div>
        {isLoading
          ? "Loading..."
          : movies.map(movie => {
              // console.log(movie);
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  rating={movie.rating}
                  summary={movie.summary}
                  poster={movie.small_cover_image}
                  genres={movie.genres}
                />
              );
            })}
      </div>
    );
  }
}

export default App;
