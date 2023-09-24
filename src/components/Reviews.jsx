import { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/fetchData";
import { RxAvatar } from "react-icons/rx";
import Loading from "./Loading";

export default function Reviews(movieId) {
  const [review, setReview] = useState([]);
  useEffect(() => {
    fetchFromAPI(`${movieId.params}/reviews`).then((data) =>
      setReview(data.results)
    );
  }, [movieId.params]);

  function convertTime(isoDateTime) {
    const date = new Date(isoDateTime);
    // Format the date as a human-readable string
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold">Reviews</h2>
      {review ? (
        <div className="mt-4 space-y-4">
          {review.slice(0, 4).map((item) => (
            <div key={item.id} className="bg-white p-4 shadow-md rounded-lg">
              <div className="flex items-center space-x-4">
                {item.author_details.avatar_path ? (
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w500" +
                      item.author_details.avatar_path
                    }
                    alt="Reviewer Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <RxAvatar className="w-12 h-12 rounded-full" />
                )}
                <div>
                  <p className="text-lg font-semibold">{item.author}</p>
                  <p className="text-gray-600">
                    {" "}
                    <strong>Created at:</strong> {convertTime(item.created_at)}
                  </p>
                </div>
              </div>
              <p className="mt-4">{item.content.slice(0, 200)}</p>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
}
