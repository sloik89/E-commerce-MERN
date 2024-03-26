import React from "react";
import { Link } from "react-router-dom";
const Pagination = ({ pages, page, isAdmin = false }) => {
  console.log(pages, page);

  return (
    pages > 1 && (
      <div className="pagination">
        {[...Array(pages).keys()].map((item) => {
          return (
            <Link
              className={`btn-pagination ${item + 1 === page ? "active" : ""}`}
              key={item}
              to={!isAdmin ? `/page/${item + 1}` : ``}
            >
              {item + 1}
            </Link>
          );
        })}
      </div>
    )
  );
};

export default Pagination;
