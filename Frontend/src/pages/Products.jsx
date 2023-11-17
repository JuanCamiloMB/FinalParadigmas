import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { storage } from "../firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [inputText, setInputText] = useState("");
  const [imagesURL, setImagesURL] = useState(null);
  const [fetched, setFetched] = useState(false);
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
    getImages();
  }, []);

  useEffect(() => {
    if (inputText === "" && products.length == 0) return;
    handlefilter();
  }, [inputText]);

  const getImages = async () => {
    const listRef = ref(storage);
    const productsImagesUrl = {};
    const res = await listAll(listRef);

    const promises = res.prefixes.map(async (folderRef) => {
      const imgRef = ref(folderRef, "img_0");
      return getDownloadURL(imgRef).then((url) => {
        productsImagesUrl[folderRef._location.path] = url;
      });
    });

    await Promise.all(promises);

    setImagesURL(productsImagesUrl);
    setFetched(true);
  };

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
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex w-full justify-center p-5 bg-cyan-950">
          <input
            className="h-10 w-1/2 p-2.5 "
            type="search"
            placeholder="Search Juanguicommerce"
            onChange={handleInput}
          />
        </div>
        <ul className="grid grid-cols-2 gap-5 m-12">
          {fetched &&
            products.map((product) => {
              return (
                <li
                  key={product._id}
                  className="bg-orange-700 border rounded-lg p-5"
                >
                  <Link to={"/products/" + product._id}>
                  <h3 className="text-2xl">
                    {product.name}
                  </h3>

                  <img
                    src={
                      product._id in imagesURL ? imagesURL[product._id] : null
                    }
                  />
                  <h4>${product.price}</h4>
                  <p>{product.description}</p>
                  <p>{product.rating}</p>
                  <p>{product.stock}</p>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Products;
