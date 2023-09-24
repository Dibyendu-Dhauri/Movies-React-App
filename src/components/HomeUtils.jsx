import { fetchFromAPI } from "../utils/fetchData";
import { useEffect, useState } from "react";
// import { MdLocalMovies } from "react-icons/md";
import {TbMovie} from 'react-icons/tb'

import { useNavigate } from "react-router";
import { RxAvatar } from "react-icons/rx";
import { genres } from "../utils/genre";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { FcRating } from "react-icons/fc";
import Loading from "./Loading";

export default function HomeUtils(item) {
  const [popularMovie, setPopularMovie] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(2); // Default to 2 slides on small screens
  const navigate = useNavigate();
  useEffect(() => {
    fetchFromAPI(`${item.item}`).then((data) => setPopularMovie(data.results));

    // Function to handle window resize
    function handleResize() {
      // Check the window width and update slidesToShow accordingly
      if (window.innerWidth < 768) {
        setSlidesToShow(2); // Change to 2 slides on small screens
      } else if (window.innerWidth < 1024 && window.innerWidth > 768) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4); // Change to 4 slides on larger screens
      }
    }

    // Add a window resize event listener
    window.addEventListener("resize", handleResize);

    // Initial call to set the initial value
    handleResize();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [item.item]);

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {item.item.toUpperCase()} MOVIES
        </h2>

        {popularMovie && popularMovie.length > 0 ? (
          <>
            <Swiper
              spaceBetween={10}
              slidesPerView={slidesToShow}
              className=" mt-6 flex flex-wrap gap-x-6 gap-y-10 w-full sm:flex-wrap  lg:flex-wrap xl:gap-x-8"
            >
              {popularMovie.map((movie) => (
                <SwiperSlide
                  key={movie.id}
                  className="  group relative px-4 hover:cursor-pointer"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 shadow-lg">
                    {movie.poster_path ? (
                      <img
                        src={
                          "https://image.tmdb.org/t/p/w500" + movie.poster_path
                        }
                        alt="poster"
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full "
                      />
                    ) : (
                      <RxAvatar className="w-full h-auto rounded-full" />
                    )}
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        <TbMovie /> {movie.title.slice(0, 17)}
                      </h3>
                      <p className="mt-1 text-md text-gray-700">
                        {movie.release_date}
                      </p>
                    </div>

                    <div>
                      <div className="   flex-col   flex items-center justify-center mb-2">
                        <FcRating className="w-10 h-10  " />
                        <span className="absolute font-bold text-lg  ">
                          {" "}
                          {movie.vote_average}
                        </span>
                      </div>
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
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <Loading/>
        )}
      </div>
    </>
  );
}
