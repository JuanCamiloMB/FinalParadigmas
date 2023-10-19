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
    <div>
      <h2>New Product</h2>
      <form id="ProductForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">price:</label>
          <input
            type="price"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">description:</label>
          <input
            type="description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="stock">stock:</label>
          <input
            type="stock"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;