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

  if (isLoading || featuredLoading) {
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
          <h1 className="main-title">Best ranking products</h1>
          <Carousel products={featured} />
        </div>
      )}

      <Wrapper>
        <h2 className="main-title">Our Products</h2>
        <div className="products-container">
          {data.products.map((item) => {
            return <Card key={item._id} product={item} />;
          })}
        </div>
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
