import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [inputText, setInputText] = useState("");
  const productsTotal = useRef();

  function handlefilter() {
    if (handlefilter.debounce) {
      clearTimeout(handlefilter.debounce);
    }

    handlefilter.debounce = setTimeout(() => {
      setProducts(
        [...productsTotal.current].filter((product) =>
          product.name.toLowerCase().includes(inputText)
        )
      );
    }, 500);
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (inputText === "" && products.length == 0) return;
    handlefilter();
  }, [inputText]);

  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
      productsTotal.current = data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    let lowercase = e.target.value.toLowerCase();
    setInputText(lowercase);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold">Products</h1>

      <input
        className="h-10 w-1/4 p-2.5 m-12 "
        type="search"
        placeholder="Search Juanguicommerce"
        onChange={handleInput}
      />
      <ul className="grid grid-cols-2 gap-5">
        {products.map((product) => {
          return (
            <li key={product._id} className="bg-orange-700 border rounded-lg p-5">
              <h3 className="text-2xl">
                <Link to={"/products/" + product._id}>{product.name}</Link>
              </h3>
              <h4>${product.price}</h4>
              <p>{product.description}</p>
              <p>{product.rating}</p>
              <p>{product.stock}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Products;
