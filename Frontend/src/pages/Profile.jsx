import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Profile = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const navigate = useNavigate();
  const user = props.user;

  const logout = async () => {
    await signOut(auth);
    navigate(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
  

  return (
    <>
      <h1>Profile</h1>
      <button onClick={logout}>LogOut</button>
      {user.email === "admin@gmail.com"? null :<button onClick={DeleteUser}>Delete Account</button>}
    </>
  );
};

export default Profile;
