import React from "react";
import { Card } from "../components";
import { useGetProductsQuery } from "../slices/productSlice";
import Wrapper from "../wrapers/Home";
const Home = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  console.log(products);
  return (
    <div className="home page-full">
      <h1>Latest products</h1>
      <Wrapper>
        {products?.map((item) => {
          return <Card key={item._id} product={item} />;
        })}
      </Wrapper>
    </div>
  );
};

export default Home;
