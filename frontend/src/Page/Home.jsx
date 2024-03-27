import React from "react";
import { Card } from "../components";
import { useGetProductsQuery } from "../slices/productSlice";
import Wrapper from "../wrapers/Home";
import { Loader } from "../components";
import { useParams } from "react-router-dom";
import { Pagination } from "../components";
import { Carousel } from "../components";
import { useGetFeaturedProductsQuery } from "../slices/productSlice";
const Home = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({
    pageNumber,
    keyword,
  });
  const {
    data: featured,
    isLoading: featuredLoading,
    isError: errorFeatured,
  } = useGetFeaturedProductsQuery();
  console.log(featured);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="home page-full">
      {data.products.length === 0 ? (
        <div>
          <h3> No products </h3>
        </div>
      ) : (
        <div>
          <h1>Latest products</h1>
          <Carousel products={featured} />
        </div>
      )}

      <Wrapper>
        {data.products.map((item) => {
          return <Card key={item._id} product={item} />;
        })}
      </Wrapper>
      <Pagination
        pages={data.pages}
        page={data.page}
        keyword={keyword ? keyword : ""}
      />
    </div>
  );
};

export default Home;
