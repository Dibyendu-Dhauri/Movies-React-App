import { Route, Routes } from "react-router"


import Nav from "./components/Nav"
import Upcoming from "./components/Upcoming"
import Home from "./components/Home"
import MovieDetails from "./components/MovieDetails"
import Popular from "./components/Popular"
import TopRated from "./components/TopRated"
import SearchMovies from "./components/SearchMovies"

function App() {
  

  return (
    <>
    <Nav/>
    <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/search/movie" element={<SearchMovies/>}/>
    <Route path="/upcoming" element={<Upcoming/>} />
    <Route path="/popular" element={<Popular/>} />
    <Route path="/top_rated" element={<TopRated/>} />
    <Route path="movie/:id" element={<MovieDetails/>}/>
    </Routes>
   
    </>
  )
}

export default App
