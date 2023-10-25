import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (inputText === "") {
      console.log("here1")
      getProducts();
    } else {
      console.log("here")
      const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(inputText);
      });
      setProducts(filteredProducts);
    }
  }, [inputText, products]);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    let lowercase = e.target.value.toLowerCase();
    setInputText(lowercase);
  };

  return (
    <>
      <h1>Products</h1>

      <input
        type="search"
        placeholder="Search Juanguicommerce"
        onChange={handleInput}
      />
      <ul>
        {products.map((product) => {
          return (
            <li key={product._id}>
              <h3>
                <Link to={"/products/" + product._id}>{product.name}</Link>
              </h3>
              <h4>{product.price}</h4>
              <p>{product.description}</p>
              <p>{product.rating}</p>
              <p>{product.stock}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Products;
