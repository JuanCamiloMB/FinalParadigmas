import { useEffect } from "react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

function notSignedIn() {
  return (
    <>
      <nav>
        <ul>
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
    </>
  );
}

function signedIn() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

const Layout = (props) => {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    setUser(props.user)
    console.log(props)
  },[])

  return(
    user === null? notSignedIn() : signedIn()
  )
};

export default Layout;
