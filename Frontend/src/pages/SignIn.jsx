import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function firebase_signin(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        const user = userCredential.user;
        navigate(0);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase_signin(formData.email, formData.password);
    console.log("Submitted:", formData);
  };

  return (
    <div className="flex flex-col justify-center content-center items-center gap-16 h-full">
      <h2 className="text-5xl">Login</h2>
      <form
        id="loginForm"
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 justify-center items-center"
      >
        <div>
          <label htmlFor="email" className="text-2xl">
            Email:
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
        <button type="submit" className="w-1/2 text-center bg-orange-700">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
