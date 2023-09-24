import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {RiMovie2Fill} from 'react-icons/ri'
// import SearchMovies from "./SearchMovies";

export default function Nav() {
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchItem) {
      navigate(`/search/movie?query=${searchItem}`);
    } else {
      navigate("/");
    }
  }, [searchItem]);
  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };

  return (
    <div className="navbar bg-base-300 border">
      <div className="navbar-start">

      <div className="dropdown  lg:hidden text-lg">
      <label tabIndex={0} className="btn btn-ghost btn-circle m-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label> 
       
      
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
     

        <li><Link to={"/upcoming?page=1"}>Upcoming Movies</Link></li>
        <li><Link to={"/popular?page=1"}>Popular Movies</Link></li>
        <li><Link to={"/top_rated?page=1"}>Top Rated</Link></li>
      </ul>
    </div>

        <Link to={"/"} className=" normal-case text-xl ">
          <RiMovie2Fill className="w-12 h-12 lg:w-16 lg:h-16" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-semibold">
          <li className="px-2 hover:cursor-pointer">
            <Link to={"/upcoming?page=1"}>Upcoming Movies</Link>
          </li>
          <li className="px-2">
            <Link to={"/popular?page=1"}>Popular Movies</Link>
          </li>

          <li className="px-2">
            <Link to={"/top_rated?page=1"}>Top Rated</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">

     
      
        <input
          type="text"
          placeholder="Search..."
          value={searchItem}
          className="input input-bordered w-full max-w-xs"
          onChange={handleChange}
        />
        
      </div>
      
    </div>
  );
}
