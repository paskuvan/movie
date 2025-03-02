import React, { useEffect, useState } from "react"
import Search from "./components/Search"
import Spinner from "./components/Spinner"
import MovieCard from "./components/MovieCard"
import { useDebounce }  from "react-use"
import { updateSearchCount } from "./appwrite.js"

//API 

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false) // This will be used to show a spinner when the app is loading
  const [deBouncedSearchTerm, setDeBouncedSearchTerm] = useState('')
  useDebounce(() => setDeBouncedSearchTerm(searchTerm), 500, [searchTerm])


  const fetchMovies = async (query) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`

      const response = await fetch(endpoint, API_OPTIONS)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setMovieList(data.results || [])
      updateSearchCount();
    } catch (error) {
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage('Failed to fetch movies')
    } finally {
      setIsLoading(false) // This will always run
    }
  }

  useEffect(() => {
    fetchMovies(searchTerm)
  }, [searchTerm])

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
              {movieList.map((movie) => (
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