import { useState } from "react";
import axios from "axios";

const CreateProduct = () => {

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    rating: 0,
    stock: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => { //http://localhost:3000/products
    e.preventDefault();
    axios.post('http://localhost:3000/products', {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        stock: formData.stock,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("Submitted:", formData);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h2 className="text-5xl">New Product</h2>
      <form id="ProductForm" onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center items-center">
        <div>
          <label htmlFor="name" className="text-xl">Name:</label>
          <input
          className="text-black mx-5"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price" className="text-xl">Price:</label>
          <input
          className="text-black mx-5"
            type="price"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description" className="text-xl">Description:</label>
          <input
          className="text-black mx-5"
            type="description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="stock" className="text-xl">Stock:</label>
          <input
          className="text-black mx-5"
            type="stock"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="bg-orange-700 w-1/2 border rounded-full border-transparent">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;