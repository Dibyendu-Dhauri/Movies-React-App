
import HomeUtils from "./HomeUtils";

export default function Home() {
  return (
    <>
      <HomeUtils item="popular" />
      <HomeUtils item="upcoming" />
      <HomeUtils item="top_rated" />
    </>
  );
}
