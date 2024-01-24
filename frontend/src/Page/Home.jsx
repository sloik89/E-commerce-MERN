import React from "react";
import products from "../products";
import { Card } from "../components";
import Wrapper from "../wrapers/Home";
const Home = () => {
  return (
    <div className="home">
      <h1>Latest products</h1>
      <Wrapper>
        {products.map((item) => {
          return <Card key={item._id} product={item} />;
        })}
      </Wrapper>
    </div>
  );
};

export default Home;
