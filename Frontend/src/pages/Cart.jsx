import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Cart = (props) => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [parcialTotals, setParcialTotals] = useState([]);
  const [total, setTotal] = useState(0);
  const email = props.user.email;

  useEffect(() => {
    getCart()
  }, []);

  const getParcialTotal = (theProducts, theQuantities) => {
    if(theProducts.length !== theQuantities.length){
      return[]
    }
    const parcialTotals = [];
    for (let i = 0; i < theProducts.length; i++) {
      let prod = theProducts[i].price * theQuantities[i].quantity;
      parcialTotals.push(prod);
    }
    setParcialTotals(parcialTotals);
    return parcialTotals;
  };

  const getTotal = (theParcialTotal) => {
    let sum = 0;
    theParcialTotal.forEach((num) => {sum += num});
    setTotal(sum);
    return sum
  };

  const getCart = async () => {
    try {
      const res = await axios.post("http://localhost:3000/users/api/getcart", {
        email: email,
      });
      const cart = res.data;
      const q = cart.map((val) => {
        return {
          productId: val.productId,
          quantity: val.quantity,
        };
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
      const parcialTotals = getParcialTotal(fetchedProducts, q)
      setParcialTotals(parcialTotals)
      getTotal(parcialTotals)
      
      return new Promise((resolve) => {
        resolve(fetchedProducts);
      })

    } catch (error) {
      console.log(error);
    }
  };

  const pay = () => {};

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
          <tr>
            <td>
              {products.map((product) => {
                return <p key={product._id}>{product.name}</p>;
              })}
            </td>
            <td>
              {products.map((product) => {
                return <p key={product._id}>{product.price}</p>;
              })}
            </td>
            <td>
              {quantities.map((element) => {
                return <p key={element.productId}>{element.quantity}</p>;
              })}
            </td>
            <td>
              {parcialTotals.map((num, index) => {
                return <p key={index}>{num}</p>;
              })}
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Total: ${total}</h2>
      <button onClick={pay}>Pay</button>
    </>
  );
};

export default Cart;
