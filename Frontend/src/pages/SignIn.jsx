import { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebase";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  async function firebase_signin(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential)
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
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
    await firebase_signin(formData.email, formData.password)
    console.log("Submitted:", formData);
  };

  return (
    <div>
      <h2>Login</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
