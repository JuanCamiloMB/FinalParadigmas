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
        console.log(result)
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
    <div className="flex flex-col justify-center items-center gap-9">
      <table className="border-collapse border border-slate-500 w-3/4">
        <thead>
          <tr>
            <th class="border border-slate-600">Product</th>
            <th class="border border-slate-600">Individual Price</th>
            <th class="border border-slate-600">Quantity</th>
            <th class="border border-slate-600">Total by product</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={product._id}>
                <td class="border border-slate-600">{product.name}</td>
                <td class="border border-slate-600">{product.price}</td>
                <td class="border border-slate-600">
                  <form
                    onSubmit={(e) =>
                      updateQuantity(e, product._id, quantities[index])
                    }
                  >
                    <input
                    className="text-black"
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
                    <button type="submit" className="bg-orange-700 w-1/4 border rounded-full border-transparent">Update</button>
                  </form>
                </td>
                <td class="border border-slate-600">{product.price * quantities[index]}</td>
                <td class="border border-slate-600">
                  <button onClick={() => remfromcart(product._id)} className="bg-orange-700 w-1/2 border rounded-full border-transparent">
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2 className="text-2xl">Total: ${total}</h2>
      <button onClick={pay} className="bg-orange-700 w-1/4 border rounded-full border-transparent">Pay</button>
    </div>
  );
};

export default Cart;
