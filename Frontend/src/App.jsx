import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NoPage from "./pages/NoPage";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom";
import Loading from "./pages/Loading";
import Product from "./pages/Product";
import CreateProduct from "./pages/CreateProduct";
import Cart from "./pages/cart";

function App() {
  const [user, setUser] = useState(null);
  const [fetched, setFetched] = useState(false)

  const monitorAuthState = async () => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("signed in: ", user.email);
        setUser(user);
        setFetched(true)
      } else {
        console.log("not logged in");
        setUser(null)
        setFetched(true)
      }
    });
  };


  useEffect(() => {
    monitorAuthState();
  }, []);

  return (
    fetched == true?
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} />}>
            <Route index element={<Home />} />
            <Route path="signin" element={user === null ? <SignIn /> : <Navigate replace to="/profile"/>} />
            <Route path="signup" element={user === null ? <SignUp /> : <Navigate replace to="/profile"/>} />
            <Route path="profile" element={user === null ? <Navigate replace to="/"/> : <Profile user={user}/>}/>
            <Route path="cart" element={user === null ? <Navigate replace to="/"/> : <Cart user={user}/>}/>
            <Route path="createproduct" element={user === null ? <NoPage/> : (user.email === "admin@gmail.com"? <CreateProduct/> : <NoPage/>)}/>
            <Route path="*" element={<NoPage />} />
          </Route>
          <Route path="/products" element={<Layout user={user} />}>
            <Route index element={<Products />} />
            <Route path=":productId" element={<Product user={user}/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
    :
    <>
      <Loading/>
    </>
  );
}

export default App;
