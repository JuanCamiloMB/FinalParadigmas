import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import EditProduct from "../components/EditProduct";

const Product = (props) => {
  const user = props.user;
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  const buttonStyle =
    "bg-orange-700 w-1/4 border rounded-full border-transparent";
  return (
    <div id="ProductInfo" className="flex justify-center items-center">
      {modalOpen && createPortal(<EditProduct closeModal={setModalOpen} productInfo={product}/>,document.getElementById("ProductInfo"))}
      {fetched ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-4xl">{product.name}</h1>
          <h3 className="text-xl">${product.price}</h3>
          <p>{product.description}</p>
          <p>Rating: {product.rating}</p>
          <p>Stock: {product.stock}</p>
          {user === null ? (
            <button onClick={goToSignIn} className={buttonStyle}>
              SignIn to Buy
            </button>
          ) : user.email === "admin@gmail.com" ? (
            <button onClick={() => setModalOpen(true)} className={buttonStyle}>
              Modify Product
            </button>
          ) : (
            <button
              onClick={addToCart}
              disabled={product.stock < 1}
              className={buttonStyle}
            >
              Add to cart
            </button>
          )}
        </div>
      ) : (
        <h1>Loading..</h1>
      )}
    </div>
  );
};

export default Product;
