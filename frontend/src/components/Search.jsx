import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../wrapers/Search";
import { FaSearch } from "react-icons/fa";
const Search = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();

  const [search, setSearch] = useState(keyword || "");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      setSearch("");
      navigate(`/search/${search}`);
    } else {
      navigate("/");
    }
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input
          style={{}}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search products..."
          value={search}
          className="input-search"
        />
        <FaSearch className="icon-search" />
        <button type="submit" className="btn btn-search">
          Search
        </button>
      </form>
    </Wrapper>
  );
};

export default Search;
