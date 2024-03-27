import React from "react";
import { Link } from "react-router-dom";
const Pagination = ({ pages, page, isAdmin = false, keyword }) => {
  return (
    pages > 1 && (
      <div className="pagination">
        {[...Array(pages).keys()].map((item) => {
          return (
            <Link
              className={`btn-pagination ${item + 1 === page ? "active" : ""}`}
              key={item}
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${item + 1}`
                    : `/page/${item + 1}`
                  : `/admin/productlist/${item + 1}`
              }
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
