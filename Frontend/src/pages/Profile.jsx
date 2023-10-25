import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Profile = (props) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const user = props.user;

  const logout = async () => {
    await signOut(auth);
    navigate(0);
  };

  const DeleteUser = async () => {
    await deleteUser(user)
      .then(() => {
        console.log("user deleted");
        navigate(0);
      })
      .catch((error) => {
        console.log("error ocurred: ", error);
      });

    await axios
      .post("http://localhost:3000/users/delete", {
        email: user.email,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getUserInfo = async () => {
    const res = await axios.get(
      `http://localhost:3000/users/api/${user.email}`
    );
    setUserInfo(res.data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <h1>Profile</h1>
      {userInfo ? (
        <>
          <h3>Name:</h3>
          <p>{userInfo.name}</p>
          <h3>Email:</h3>
          <p>{userInfo.email}</p>
          <h3>Phone:</h3>
          <p>{userInfo.phone}</p>
          <h3>Addresses:</h3>
          <p>{userInfo.addresses}</p>
        </>
      ) : null}
      <button onClick={logout}>LogOut</button>
      {user.email === "admin@gmail.com" ? null : (
        <button onClick={DeleteUser}>Delete Account</button>
      )}
    </>
  );
};

export default Profile;
