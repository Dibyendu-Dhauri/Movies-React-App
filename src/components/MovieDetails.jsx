import { useParams } from "react-router";
import { TbMessageLanguage } from "react-icons/tb";
import { GiFilmProjector } from "react-icons/gi";
import { GrLanguage } from "react-icons/gr";
import { FcRating } from "react-icons/fc";
import { SlCalender } from "react-icons/sl";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";

import { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/fetchData";
import Reviews from "./Reviews";
import SimilarMovies from "./SimilarMovies";
import { RxAvatar } from "react-icons/rx";

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState([]);

  const params = useParams();
  useEffect(() => {
    fetchFromAPI(`${params.id}`).then((data) => setMovieDetails(data));
  }, [params.id]);

  function formatBudget(budget) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      minimumFractionDigits: 0,
    });

    return formatter.format(budget);
  }

  return (
    <div className="bg-gray-100">
      {movieDetails && (
        <div className="hero min-h-screen bg-base-200  ">
          <div className="hero-content flex-col lg:flex-row rounded-lg">
            {movieDetails.poster_path ? (
              <img
                src={
                  "https://image.tmdb.org/t/p/w300" + movieDetails.poster_path
                }
                className="max-w-sm rounded-lg shadow-2xl "
              />
            ) : (
              <RxAvatar className="w-full h-auto rounded-full" />
            )}

            <div className=" h-full w-full px-10">
              <h1 className="text-5xl font-bold">
                {movieDetails.original_title}
              </h1>
              <p className="py-6 pr-10">{movieDetails?.overview}</p>
              <button className="btn btn-outline rounded-lg m-1 shadow-lg">
                <TbMessageLanguage className="w-8 h-8" />
                {movieDetails.original_language
                  ? movieDetails.original_language
                  : ""}
              </button>

              <button className="btn btn-outline rounded-lg m-1 shadow-lg">
                <GiFilmProjector className="w-8 h-8" />

                {movieDetails.genres && movieDetails.genres.length > 0
                  ? movieDetails.genres[0].name
                  : ""}
              </button>
              <button className="btn btn-outline rounded-lg m-1 shadow-lg">
                <GiFilmProjector className="w-8 h-8" />

                {movieDetails.genres && movieDetails.genres.length > 1
                  ? movieDetails.genres[1].name
                  : ""}
              </button>
              <button className="btn btn-outline rounded-lg m-1 shadow-lg">
                <GrLanguage className="w-8 h-8" />

                {movieDetails.production_countries &&
                movieDetails.production_countries.length > 0
                  ? movieDetails.production_countries[0].name
                  : " "}
              </button>

              <button className="btn btn-outline rounded-lg m-1 shadow-lg ">
                <FcRating className="w-8 h-8" />
                <div className="badge"> {movieDetails.vote_average}</div>
              </button>

              <button className="btn btn-outline rounded-lg m-1 shadow-lg">
                <SlCalender className="w-8 h-8" />
                <div className="badge">{movieDetails.release_date}</div>
              </button>
              <button className="btn btn-outline rounded-lg m-1 shadow-lg">
                <FaMoneyBillWave className="w-8 h-8" />
                Budget
                <div className="badge">{formatBudget(movieDetails.budget)}</div>
              </button>
              <button className="btn btn-outline rounded-lg m-1 shadow-lg">
                <BiMoneyWithdraw className="w-8 h-8" />
                Revenue
                <div className="badge">
                  {formatBudget(movieDetails.revenue)}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto py-8 px-4">
        <Reviews params={params.id} />
        <SimilarMovies movieId={params.id} />
      </div>
    </div>
  );
}
