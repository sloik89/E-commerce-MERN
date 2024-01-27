import React, { useEffect, useState } from "react";

import { Card } from "../components";
import axios from "axios";
import Wrapper from "../wrapers/Home";
const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios("/api/products");
      setProducts(data);
    };
    fetchData();
  }, []);
  return (
    <div className="home page-full">
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
