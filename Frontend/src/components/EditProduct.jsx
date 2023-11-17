import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, deleteObject } from "firebase/storage";

const EditProduct = ({ closeModal, productInfo }) => {
  const [productData, setProductData] = useState(productInfo);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImagesChange = (e) => {
    setImages(e.target.files);
  };

  const submitImages = async () => {
    const folderRef = ref(storage, `${productData._id}`);
    await deleteObject(folderRef)
      .then(() => {
        console.log("Images deleted");
      })
      .catch((error) => {
        console.log("error");
      });

    for (let i = 0; i < images.length; i++) {
      const imgRef = ref(folderRef, `img_${i}`);
      await uploadBytes(imgRef, images[i])
        .then((snaphot) => {
          console.log("Image uploaded");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/products/api/updateproduct", {
        productData,
        id: productData._id,
      })
      .then(async (res) => {
        console.log(res.data);
        if (images.length > 0) {
          await submitImages();
        }
        navigate(0);
      });
    // console.log(productData)
  };

  return (
    <div className="fixed top-1/4 bg-orange-800 w-1/3 h-1/3 flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl">Edit Product info</h1>
      <form
        className="flex flex-col gap-5 justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div>
          <label>Name:</label>
          <input
            defaultValue={productData.name}
            onChange={handleChange}
            id="name"
            name="name"
            className="text-black mx-5"
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            defaultValue={productData.description}
            onChange={handleChange}
            id="description"
            name="description"
            className="text-black mx-5"
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            defaultValue={productData.price}
            onChange={handleChange}
            id="price"
            name="price"
            className="text-black mx-5"
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            defaultValue={productData.stock}
            onChange={handleChange}
            id="stock"
            name="stock"
            className="text-black mx-5"
          />
        </div>
        <div>
          <input
            id="imgImput"
            name="imgInput"
            type="file"
            accept="image/png,image/jpeg"
            placeholder="Upload Images"
            multiple
            onChange={handleImagesChange}
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

export default EditProduct;
