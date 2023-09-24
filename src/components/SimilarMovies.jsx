import { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/fetchData";
import { RxAvatar } from "react-icons/rx";
import Loading from "./Loading";

export default function SimilarMovies(Id) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchFromAPI(`${Id.movieId}/similar`).then((data) =>
      setMovies(data.results)
    );
  }, [Id.movieId]);

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold">Similar Movies</h2>
      {movies ? (
        <div className="mt-4 flex flex-wrap gap-4">
          {movies.slice(0, 10).map((item) => (
            <div
              key={item.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
            >
              <div className="bg-white p-4 shadow-md rounded-lg">
                {item.poster_path ? (
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                    alt="Similar Movie Poster"
                    className="w-full h-auto"
                  />
                ) : (
                  <RxAvatar className="w-full h-auto rounded-full" />
                )}

                <p className="mt-2 font-semibold">{item.title.slice(0, 21)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
}
