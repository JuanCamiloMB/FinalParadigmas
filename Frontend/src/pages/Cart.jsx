import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = (props) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [total, setTotal] = useState(0);

  const email = props.user.email;
  const uid = props.user.uid;

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getTotal();
  }, [products]);

  const getTotal = () => {
    let sum = 0;
    products.forEach((product, index) => {
      sum = sum + product.price * quantities[index];
    });
    setTotal(sum);
  };

  const getCart = async () => {
    try {
      const res = await axios.post("http://localhost:3000/users/api/getcart", {
        email: email,
      });
      const cart = res.data;
      const q = cart.map((val) => {
        return val.quantity;
      });
      setQuantities(q);
      const dataPromises = cart.map(async (element) => {
        const response = await axios.get(
          `http://localhost:3000/products/${element.productId}`
        );
        const result = response.data;
        return result;
      });
      const fetchedProducts = await Promise.all(dataPromises);
      setProducts(fetchedProducts);

      return new Promise((resolve) => {
        resolve(fetchedProducts);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const remfromcart = async (productId) => {
    try {
      await axios
        .post("http://localhost:3000/users/api/remfromcart", {
          email: email,
          productId: productId,
        })
        .then(async (res) => {
          console.log(res);
          await getCart();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const pay = async () => {
    const res = await axios.post("http://localhost:3000/users/api/paycart", {
      email: email,
      uid: uid,
      total: total,
    });
    console.log(res.data);
    navigate(0);
  };

  const updateQuantity = async (event, productId, quantity) => {
    event.preventDefault();
    getTotal();
    const res = await axios.post(
      "http://localhost:3000/users/api/modifyquantity",
      {
        email: email,
        productId: productId,
        quantity: quantity,
      }
    );
    console.log(res.data);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Individual Price</th>
            <th>Quantity</th>
            <th>Total by product</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <form
                    onSubmit={(e) =>
                      updateQuantity(e, product._id, quantities[index])
                    }
                  >
                    <input
                      type="number"
                      value={quantities[index]}
                      id="quantity"
                      name="quantity"
                      min={1}
                      max={product.stock}
                      onChange={(e) => {
                        let updatedQuantities = [...quantities];
                        updatedQuantities[index] = e.target.value;
                        setQuantities(updatedQuantities);
                      }}
                    />
                    <button type="submit">Update</button>
                  </form>
                </td>
                <td>{product.price * quantities[index]}</td>
                <td>
                  <button onClick={() => remfromcart(product._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2>Total: ${total}</h2>
      <button onClick={pay}>Pay</button>
    </>
  );
};

export default Cart;
