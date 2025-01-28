import "./purchaseItems.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StripeCheckout from 'react-stripe-checkout'
export default function PurchaseItems({
  cartItems,
  discount,
  totalPrice,
  setItemsPurchased,
  setCartItems,
}) {
  
  const navigate = useNavigate();
  const [displayTimer, setDisplayTimer] = useState(false);
  cartItems.sort((item1, item2) => item1.level - item2.level);

  const returnCart = () => {
    setDisplayTimer(true);
    setTimeout(() => {
      navigate("/cart");
    }, 2000);
  };

  const returnHome = () => {
    setDisplayTimer(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const [form, setForm] = useState({});

  const updatePurchaseHistory = (items, choices) => {
    let updatedItems = [...items];

    choices.forEach((element) => {
      updatedItems.unshift({ ...element });
    });

    return updatedItems;
  };
  const purchase = async (e) => {
    e.preventDefault();
    const data = { cartItems, discount, totalPrice, form };

    try {
      const response = await axios.post("http://localhost:3000/purchase", data);
      let purchased = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

      const updatedItemsPurchased = updatePurchaseHistory(purchased, cartItems);

      localStorage.setItem(
        "purchaseHistory",
        JSON.stringify(updatedItemsPurchased)
      );
      setItemsPurchased(updatedItemsPurchased);
      setCartItems([]);
      localStorage.setItem("cartItems", JSON.stringify([]));
      alert("Purchased");
      returnHome();
    } catch (error) {
      console.error("Some thing went wrong");
      alert(error);
    }
  };
  
  const makePayment = async (token) => { 
    const body = {
      token,
      cartItems
    }
    const headers = {
      'Content-Type':'application/json'
    }
    const response = await fetch('http://localhost:3000/payment',{
      method:'POST',
      headers:headers,
      body:JSON.stringify(body)
    })

    const data = await response.json()

    if(data.success){
      alert('Payment successfull')
    }else{
      alert('Payment Failed')
    }
  }


  return (
    <div className="purchase-items">
      <button onClick={purchase}>Send</button>
      <button className="back-button" onClick={returnCart}>
        Back
      </button>
      {displayTimer && <div className="timer"></div>}

      <h1>CHECKOUT</h1>
      <form onSubmit={purchase}>
        <h2>Billing Details</h2>

        <label htmlFor="User Name">
          <h2>User Name </h2>
          <div className="two-inputs">
            <input
              type="text"
              placeholder="Your Name: "
              name="UserName"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Your Company Name(optional): "
              name="CompanyName"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
          </div>
        </label>
        <label htmlFor="Country/Region">
          <h2>Country/Region </h2>
          <input
            type="text"
            placeholder="Your Country/Region: "
            name="Country_or_Region"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            required
          />
        </label>
        <label htmlFor="State/County">
          <h2>State /County</h2>
          <input
            type="text"
            placeholder="Your State/County: "
            name="State_or_County"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            required
          />
        </label>
        <label htmlFor="Town/City">
          <h2>Town/City </h2>
          <input
            type="text"
            placeholder="Your Town/City: "
            name="Town_or_City"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            required
          />
        </label>
        <label htmlFor="Street Address">
          <h2>Street Address </h2>
          <div className="two-inputs">
            <input
              type="text"
              placeholder="House Number and Street Name: "
              name="HouseNumber_and_Street_Name"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Apartment, Suite, Unit ,etc .(optional): "
              name="Apartment/Suite/Unit"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
          </div>
        </label>

        <label htmlFor="PostCode/PinCode/ZipCode">
          <h2>Post/Pin/Zip Code</h2>
          <input
            type="text"
            placeholder="PostCode /PinCode/ZipCode: "
            name="PostCode/PinCode/ZipCode"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            required
          />
        </label>
        <label htmlFor="Phone">
          <h2>Phone </h2>
          <input
            type="phone"
            placeholder="Your Phone: "
            name="Phone"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            required
          />
        </label>
        <label htmlFor="Email Address">
          <h2>Email: </h2>
          <input
            type="email"
            placeholder="Enter your Email address: "
            name="EmailAddress"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            required
          />
        </label>

        <h2 style={{ marginBlock: "20px" }}>ADDITIONAL INFORMATION</h2>
        <div className="additional_information">
          <h3>Order Notes</h3>
          <textarea
            placeholder="Notes about your order, eg: special notes for delivery: "
            name="additional-information"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="order-details">
          <h2>Your Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Orders</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <span>Level : {item.level}</span>
                      <h3>{item.plan}</h3>
                    </td>
                    <td>
                      <span>{item.amount * item.quantity}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2>
            Total Price : ${totalPrice - discount}{" "}
            {discount > 0 && (
              <span style={{ textDecoration: "line-through" }}>
                ${totalPrice}
              </span>
            )}
          </h2>
        </div>

        
      </form>
      {cartItems.length > 0 && <StripeCheckout stripeKey="Key=" token={makePayment} name="Purchase Items">
          <button className="purchase">Pay</button>
          </StripeCheckout>}
    </div>
  );
}
