import { fetchFromAPI } from "../utils/fetchData";
import { genres } from "../utils/genre";
import { useEffect, useState } from "react";

import {TbMovie} from 'react-icons/tb'
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router";
import Loading from "./Loading";

export default function PageUtils(item) {
  const [upComingMovie, setUpComingMovie] = useState([]);
  const [getAllDetails, setGetAllDetails] = useState([]); 
  const [pageCount, setPageCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFromAPI(`${item.movietypes}?page=${pageCount}`).then((data) => {
      setGetAllDetails(data);
      setUpComingMovie(data.results);
    });
    navigate(`?page=${pageCount}`);
  }, [pageCount]);

  const handleClick = (pageNumber) => {
    if (
      (pageCount > 1 || pageNumber === 1) &&
      (pageCount < getAllDetails.total_pages || pageNumber === -1)
    ) {
      setPageCount((prev) => prev + pageNumber);
    }
  };
// console.log(upComingMovie)
  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {item.movietypes.toUpperCase()} MOVIES
        </h2>

        {upComingMovie && upComingMovie.length > 0 ? (
          <div className=" mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
            {upComingMovie.slice(0, 12).map((movie) => (
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
                      <TbMovie /> { movie.title ? ( movie.title.slice(0, 17)) : ("")}
                    </h3>
                    <p className="mt-1 text-md text-gray-700">
                      {movie.release_date ? (movie.release_date) : ("")}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <p className="text-lg font-medium text-gray-900 rounded-full bg-blue-500 w-10 h-10 flex items-center justify-center mb-2">
                      {movie.vote_average ? (movie.vote_average) : ("")}
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
      <div className="join flex justify-center items-end p-4 ">
        <button className="join-item btn" onClick={() => handleClick(-1)}>
          «
        </button>
        <button
          className={
            pageCount === 1
              ? "join-item btn btn-active bg-gray-500"
              : "join-item btn "
          }
          onClick={() => setPageCount(1)}
        >
          1
        </button>

        <button
          className={
            pageCount === 2
              ? "join-item btn btn-active bg-gray-500"
              : "join-item btn "
          }
          onClick={() => setPageCount(2)}
        >
          2
        </button>

        <button className="join-item btn btn-disabled">...</button>

        <button
          className={
            pageCount !== 1 &&
            pageCount !== 2 &&
            pageCount !== getAllDetails.total_pages &&
            pageCount !== getAllDetails.total_pages - 1
              ? "join-item btn btn-active  bg-gray-500"
              : "join-item btn  "
          }
        >
          {pageCount !== 1 &&
          pageCount !== 2 &&
          pageCount !== getAllDetails.total_pages &&
          pageCount !== getAllDetails.total_pages - 1
            ? pageCount
            : "..."}
        </button>

        <button
          className={
            pageCount === getAllDetails.total_pages - 1
              ? "join-item btn btn-active bg-gray-500"
              : "join-item btn "
          }
          onClick={() => setPageCount(getAllDetails.total_pages - 1)}
        >
          {getAllDetails && getAllDetails.total_pages - 1}
        </button>
        <button
          className={
            pageCount === getAllDetails.total_pages
              ? "join-item btn btn-active bg-gray-500"
              : "join-item btn "
          }
          onClick={() => setPageCount(getAllDetails.total_pages)}
        >
          {getAllDetails && getAllDetails.total_pages}
        </button>
        <button className="join-item btn" onClick={() => handleClick(1)}>
          »
        </button>
      </div>
    </div>
  );
}
