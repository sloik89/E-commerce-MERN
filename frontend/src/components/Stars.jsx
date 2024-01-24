import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const Stars = ({ rating, numReviews }) => {
  const tempStars = Array.from({ length: 5 }, (_, idx) => {
    const number = idx + 0.5;
    return (
      <span className="star">
        {rating >= idx + 1 ? (
          <BsStarFill />
        ) : rating >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  console.log(tempStars);
  return <div className="stars">{tempStars.map((star) => star)}</div>;
};

export default Stars;
