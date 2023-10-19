import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [fetched, setFetched] = useState(false);

  const getProduct = async () => {
    try {
      await axios
        .get("http://localhost:3000/products/" + productId)
        .then((res) => {
          setProduct(res.data);
          setFetched(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      {fetched ? (
        <>
          <h1>{product.name}</h1>
          <h3>${product.price}</h3>
          <p>{product.description}</p>
          <p>Rating: {product.rating}</p>
          <p>Stock: {product.stock}</p>
        </>
      ) : (
        <h1>Loading..</h1>
      )}
    </>
  );
};

export default Product;
