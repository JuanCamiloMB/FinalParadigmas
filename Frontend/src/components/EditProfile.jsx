import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ closeModal, userInfo }) => {
  const [userData, setUserData] = useState(userInfo);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users/api/updateuser", userData)
      .then((res) => {
        console.log(res.data);
        navigate(0)
      });
    // console.log(userData)
  };

  return (
    <div className="fixed top-1/4 bg-orange-800 w-1/3 h-1/2 flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl">Edit Profile info</h1>
      <form
        className="flex flex-col gap-5 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div>
          <label>Name:</label>
          <input
            defaultValue={userData.name}
            onChange={handleChange}
            id="name"
            name="name"
            className="text-black mx-5"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            defaultValue={userData.email}
            onChange={handleChange}
            id="email"
            name="email"
            className="text-black mx-5"
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            defaultValue={userData.phone}
            onChange={handleChange}
            id="phone"
            name="phone"
            className="text-black mx-5"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-700 w-1/2 border rounded-full border-transparent"
        >
          Make changes
        </button>
      </form>
      <button
        onClick={() => closeModal(false)}
        className="bg-orange-700 w-1/4 border rounded-full border-transparent"
      >
        Cancel
      </button>
    </div>
  );
};

export default EditProfile;
