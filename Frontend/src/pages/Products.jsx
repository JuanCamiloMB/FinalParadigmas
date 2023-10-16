import { useEffect } from "react";
import { useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetch("http://localhost:3000/products");
    setProducts(await response.json());
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
