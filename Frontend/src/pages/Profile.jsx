import { signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { render } from "react-dom";
import EditProfile from "../components/EditProfile";

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

  const UpdateUser = ()=>{
    render(<EditProfile></EditProfile>) //undone
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-4xl font-bold p-5 m-5">Profile</h1>
      {userInfo ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-row">
          <h3 className="text-xl">Name:</h3>
          <p className="mx-5">{userInfo.name}</p>
          </div>
          <div className="flex flex-row">
          <h3 className="text-xl">Email:</h3>
          <p className="mx-5">{userInfo.email}</p>
          </div>
          <div className="flex flex-row">
          <h3 className="text-xl">Phone:</h3>
          <p className="mx-5">{userInfo.phone}</p>
          </div>
          <div className="flex flex-row">
          <h3 className="text-xl">Addresses:</h3>
          <p className="mx-5">{userInfo.addresses}</p>
          </div>

        </div>
      ) : null}

      <button onClick={logout} className="bg-orange-700 w-1/4 border rounded-full border-transparent">LogOut</button>
      {user.email === "admin@gmail.com" ? null : (
        <>
        <button onClick={DeleteUser} className="bg-orange-700 w-1/4 border rounded-full border-transparent">Delete Account</button>
        {/* <button onClick={UpdateUser} className="bg-orange-700 w-1/4 border rounded-full border-transparent">Edit</button> */}
        </>
      )}
    </div>
  );
};

export default Profile;
