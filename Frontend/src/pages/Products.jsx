import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => { //http://localhost:3000/products
    try{
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <h1>Products</h1>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <ul>
                <li>{product.name}</li>
                <li>{product.price}</li>
                <li>{product.description}</li>
                <li>{product.rating}</li>
                <li>{product.stock}</li>
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Products;
