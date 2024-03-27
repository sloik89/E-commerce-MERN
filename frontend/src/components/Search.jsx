import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  console.log(keyword);
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
    <form onSubmit={handleSubmit}>
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search products..."
        value={search}
      />
      <button type="submit" className="btn">
        Search
      </button>
    </form>
  );
};

export default Search;
