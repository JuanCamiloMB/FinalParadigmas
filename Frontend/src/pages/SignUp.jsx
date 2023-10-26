import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    //http://localhost:3000/products
    e.preventDefault();
    axios
      .post("http://localhost:3000/users", {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
      })
      .then(function (response) {
        console.log(response);
        navigate("/signin");
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("Submitted:", formData);
  };

  return (
    <div className="flex flex-col justify-center content-center items-center gap-16 h-full">
      <h2 className="text-5xl">SignUp</h2>
      <form
        id="SignUpForm"
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 justify-center items-center"
      >
        <div>
          <label htmlFor="email" className="text-2xl">
            email:
          </label>
          <input
            className="mx-7 border bg-orange-200 text-black"
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="text-2xl">
            Password:
          </label>
          <input
            className="mx-7 border bg-orange-200 text-black"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name" className="text-2xl">
            name:
          </label>
          <input
            className="mx-7 border bg-orange-200 text-black"
            type="name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-2xl">
            phone:
          </label>
          <input
            className="mx-7 border bg-orange-200 text-black"
            type="phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="w-1/2 text-center bg-orange-700">SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
