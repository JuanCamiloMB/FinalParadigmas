import { useEffect } from "react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

function notSignedIn() {
  const div_style = "flex flex-col min-h-screen h-full w-full"
  const nav_style = "p-4 flex justify-center bg-blue-950 text-white"
  const ul_style = "flex flex-row gap-10"
  return (
    <div className={div_style}>
      <nav className={nav_style}>
        <ul className={ul_style}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/signin">SignIn</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

function signedIn(userEmail) {
  const div_style = "flex flex-col min-h-screen h-full w-full"
  const nav_style = "p-4 flex justify-center bg-blue-950 text-white"
  const ul_style = "flex flex-row gap-10"
  return (
    <div className={div_style}>
      <nav className={nav_style}>
        <ul className={ul_style}>
          <li>{userEmail}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/cart">Shoping Cart</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

function admin() {
  const div_style = "flex flex-col min-h-screen h-full w-full"
  const nav_style = "p-4 flex justify-center bg-blue-950 text-white"
  const ul_style = "flex flex-row gap-10"
  return (
    <div className={div_style}>
      <nav className={nav_style}>
        <ul className={ul_style}>
          <li>
            admin
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/createproduct">CrearProducto</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

const Layout = (props) => {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    setUser(props.user)
  },[])

  return(
    user === null? notSignedIn() : (user.email === "admin@gmail.com"? admin() : signedIn(user.email))
  )
};

export default Layout;
