import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  const user = props.user;
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [fetched, setFetched] = useState(false);

  const goToSignIn = () => {
    navigate("/signin");
  };

  const addToCart = async () => {
    try {
      await axios
        .post("http://localhost:3000/users/api/addtocart", {
          email: user.email,
          productId: productId,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
  }, [product]);
  return (
    <>
      {fetched ? (
        <>
          <h1>{product.name}</h1>
          <h3>${product.price}</h3>
          <p>{product.description}</p>
          <p>Rating: {product.rating}</p>
          <p>Stock: {product.stock}</p>
          {user === null ? (
            <button onClick={goToSignIn}>SignIn to Buy</button>
          ) : (
            <button onClick={addToCart} disabled={product.stock<1}>Add to cart</button>
          )}
        </>
      ) : (
        <h1>Loading..</h1>
      )}
    </>
  );
};

export default Product;
