import React, { useState, useEffect } from "react";
import Products from "../../../src/containers/products";
import Modal from "../../../src/components/Modal";
import { getProducts } from "../../../src/apis/global-api";

const ItemProductsPage = ({ query }) => {
  const [loading, setloading] = useState(false);
  const [products, setproducts] = useState([]);
  const [url, seturl] = useState("");
  const [open, setopen] = useState(true);

  const { type } = query;

  useEffect(() => {
    setopen(true);
  }, []);

  // const fetchTypeProducts = async () => {
  //   await getProducts(`?type=${type}&paginate=12`).then((data) => {
  //     console.log(type, data);
  //     setproducts(data);
  //   });
  // };

  return (
    <>
      <Modal open={open}  />
      <Products loading={loading} url={`?type=${type}&paginate=12`} />
    </>
  );
};
ItemProductsPage.getInitialProps = ({ query }) => {
  return { query };
};
export default ItemProductsPage;
