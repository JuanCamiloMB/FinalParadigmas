import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Cart = (props) => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [parcialTotals, setParcialTotals] = useState([]);
  const email = props.user.email;

  useEffect(() => {
    getCart();
  }, []);

  const getParcialTotal = () => {
    const parcialTotals = [];
    for (let i = 0; i <= products.length; i++) {
      let prod = products[i].price * quantities[i];
      parcialTotals.push(prod);
    }
    setParcialTotals(parcialTotals);
  };

  const getTotal = () => {
    sum = 0;
    parcialTotals.forEach((num) => sum + num);
    return sum;
  };

  const getCart = async () => {
    try {
      const res = await axios.post("http://localhost:3000/users/api/getcart", {
        email: email,
      });
      const cart = res.data;
      const q = await cart.map((val) => {
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
      const fetcedProducts = await Promise.all(dataPromises);
      setProducts(fetcedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const pay = ()=>{

  }

  return (
    <>
      <table>
        <tr>
          <th>Product</th>
          <th>Individual Price</th>
          <th>Quantity</th>
          <th> </th>
        </tr>
        <tr>
          <td>
            {products.map((product) => {
              return <p>{product.name}</p>;
            })}
          </td>
          <td>
            {products.map((product) => {
              return <p>{product.price}</p>;
            })}
          </td>
          <td>
            {quantities.map((num) => {
              return <p>{num}</p>;
            })}
          </td>
          <td>
            {parcialTotals.map((num) => {
              return <p>{num}</p>;
            })}
          </td>
        </tr>
      </table>
      <button onClick={pay}>Pay</button>
    </>
  );
};

export default Cart;
