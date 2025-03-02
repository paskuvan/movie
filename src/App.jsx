import React, { useEffect, useState } from "react"
import Search from "./components/Search"
import Spinner from "./components/Spinner"
import MovieCard from "./components/MovieCard";

//API 

const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie?api_key=46bd574be3b22dd5299c4e9bbdfa033a";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // This will be used to show a spinner when the app is loading

  const fetchMovies = async() => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(API_BASE_URL, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
        setMovieList([]);
        return;
      }

      const data = await response.json();
      setMovieList(data.results || []);
      console.log(data);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Failed to fetch movies');
    } finally {
      setIsLoading(false); // This will always run
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
       <div className="pattern" />

        <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
            <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>

            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

       
       <section className="all-movies">
       <h2 className="mt-[40px]">Popular Movies</h2>
        {isLoading ? (
           <Spinner />
        ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>  
          ) : (
            <ul>
              {movieList.map((movie) =>(
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}

       <h1 className="text-white">{searchTerm}</h1>
       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
       </section>

        </div>
    </main>  
  )
}

export default App