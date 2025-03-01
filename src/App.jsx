import React, { useEffect, useState } from "react"
import Search from "./components/Search"

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
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMovies = async() => {
    try {
      const response = await fetch(API_BASE_URL, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Failed to fetch movies');
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
        </header>

       <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
       <h1 className="text-white">{searchTerm}</h1>
       {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    </main>  
  )
}

export default App