import {  useLocation, useNavigate } from "react-router"
import { options } from "../utils/fetchData";
import { useState, useEffect } from "react";
import axios from "axios";
import { RxAvatar } from "react-icons/rx";
import { MdLocalMovies } from "react-icons/Md";
import { genres } from "../utils/genre";
import Loading from "./Loading";


export default function SearchMovies() {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
  const baseUrl = `https://api.themoviedb.org/3/search/movie?query=${query}`

  const navigate = useNavigate();
  useEffect(()=>{
    async function fetchData(){
        const {data} = await axios.get(`${baseUrl}`,options)
        setResults(data.results)
      }
      fetchData();
    
  },[query])


  return (
    <div className="bg-white ">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {results.title} 
      </h2>

      {results && results.length > 0 ? (
        <div className=" mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {results.map((movie) => (
            <div
              key={movie.id}
              className="  group relative   "
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 shadow-lg  hover:cursor-pointer">
                {movie.poster_path ? (
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w500" + movie.poster_path
                    }
                    alt="poster"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                ) : (
                  <RxAvatar className="w-full h-auto rounded-full" />
                )}
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    <MdLocalMovies /> {movie.title.slice(0, 17)}
                  </h3>
                  <p className="mt-1 text-md text-gray-700">
                    {movie.release_date}
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-medium text-gray-900 rounded-full bg-blue-500 w-10 h-10 flex items-center justify-center mb-2">
                    {parseFloat(movie.vote_average.toFixed(1))}
                  </p>
                  {movie.genre_ids && movie.genre_ids.length > 0 ? (
                    <>
                      {genres.map((item) => (
                        <p key={item.id}>
                          {item.id === movie.genre_ids[0] ? (
                            <button className="btn btn-outline rounded-lg  shadow-lg">
                              {item.name}
                            </button>
                          ) : (
                            <> </>
                          )}
                        </p>
                      ))}
                    </>
                  ) : (
                    <>null</>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading/>
      )}
    </div>
  </div>
  )
}
