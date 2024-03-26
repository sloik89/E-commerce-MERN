import React from "react";
import { Card } from "../components";
import { useGetProductsQuery } from "../slices/productSlice";
import Wrapper from "../wrapers/Home";
import { Loader } from "../components";
import { useParams } from "react-router-dom";
import { Pagination } from "../components";
const Home = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ pageNumber });
  console.log(isError);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="home page-full">
      <h1>Latest products</h1>
      <Wrapper>
        {data.products.map((item) => {
          return <Card key={item._id} product={item} />;
        })}
      </Wrapper>
      <Pagination pages={data.pages} page={data.page} />
    </div>
  );
};

export default Home;
