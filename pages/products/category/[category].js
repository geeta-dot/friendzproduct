import React, { useState, useEffect } from "react";
import Products from "../../../src/containers/products";
import { getProducts } from "../../../src/apis/global-api";

const CategoryProductsPage = ({ query }) => {
  const [loading, setloading] = useState(false);
  const [products, setproducts] = useState([]);
  const [url, seturl] = useState("");

  const { category } = query;

  // useEffect(() => {
  //   fetchTypeProducts();
  // }, []);

  // const fetchTypeProducts = async () => {
  //   await getProducts(`?type=${type}&paginate=12`).then((data) => {
  //     console.log(type, data);
  //     setproducts(data);
  //   });
  // };

  return (
    <Products loading={loading} url={`?category=${category}&paginate=12`} />
  );
};
CategoryProductsPage.getInitialProps = ({ query }) => {
  return { query };
};
export default CategoryProductsPage;
