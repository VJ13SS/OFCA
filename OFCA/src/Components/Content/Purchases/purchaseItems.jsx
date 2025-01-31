import "./purchaseItems.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import emailjs from "@emailjs/browser";

export default function PurchaseItems({
  cartItems,
  discount,
  totalPrice,
  setItemsPurchased,
  itemsPurchased,
  setCartItems,
}) {
  const navigate = useNavigate();
  const [displayTimer, setDisplayTimer] = useState(false);

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

  //Fields are similar to the ones defined in Email js Template
  const [form, setForm] = useState({
    totalPrice: 0,
    discount: 0,
    finalPrice: 0,
    UserName: "",
    EmailAddress: "",
    CompanyName: "Not Available",
    Country_or_Region: "",
    State_or_County: "",
    Town_or_City: "",
    HouseNumber_and_StreetName: "",
    PostCode_or_PinCode_or_ZipCode: "",
    Phone: "",
    additional_information: "Not Available",
    products_table: "",
  });

  //Products table to be displayed in the email account
  const generateProductsTable = () => {
    return `<table style = "
    width: 90%;
    border-collapse: collapse;">
    <thead>
      <tr>
          <th style="text-align:center; border:1px solid black;padding:10px;">Level</th>
          <th style="text-align:center; border:1px solid black;padding:10px;">Plan</th>
          <th style="text-align:center; border:1px solid black;padding:10px;">Quantity</th>
          <th style="text-align:center; border:1px solid black;padding:10px;">Price</th>
      </tr>
    </thead>
    <tbody>
      ${cartItems
        .map((item) => {
          return `
          <tr>
              <td style = "text-align:center;border:1px solid black;padding: 10px;">
                <span>${item.level}</span>
              </td>
              <td style = "text-align:center;border:1px solid black;padding: 10px;">
                <span>OFCA Certification Programme ${item.plan}</span>
              </td>
              <td style = "text-align:center;border:1px solid black;padding: 10px;">
                <span>${item.quantity}</span>
              </td>
              <td style = "text-align:center;border:1px solid black;padding: 10px;">
                <span>${item.amount * item.quantity}</span>
              </td>
          </tr>`;
        })
        .join("")}
      </tbody>
      </table>`;
  };

  //To update the form fields
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      totalPrice: totalPrice,
      discount: discount,
      finalPrice: totalPrice - discount,
      products_table: generateProductsTable(),
    }));
  }, [totalPrice, discount]);

  //Updating the purchase history
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
      setItemsPurchased(updatedItemsPurchased);

      if (updatedItemsPurchased.length > 50) {
        setItemsPurchased(updatedItemsPurchased.slice(0, 49));
      }

      //Updating the local storage
      localStorage.setItem("purchaseHistory", JSON.stringify(itemsPurchased));

      //update the cart
      setCartItems([]);
      localStorage.setItem("cartItems", JSON.stringify([]));

      alert("Purchased");
      returnHome();
    } catch (error) {
      console.error("Some thing went wrong");
      alert(error);
    }
  };

  //Connecting the stripe API
  const makePayment = async (token) => {
    const body = {
      token,
      cartItems,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch("http://localhost:3000/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.success) {
      alert("Payment successfull");
    } else {
      alert("Payment Failed");
    }
  };

  //to get the purchased date of the program
  const purchasedDate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCartItems((prev) =>
      prev.map((item) => {
        return { ...item, purchasedOn: formattedDate };
      })
    );
  };

  //Function to link the email js email service
  const sendEmail = () => {
    purchasedDate()
    setForm({ ...form, products_table: generateProductsTable() });

    emailjs.send("service_", "template_", form, "7xzu1_").then(
      (response) => {
        let purchased =
          JSON.parse(localStorage.getItem("purchaseHistory")) || [];
        const updatedItemsPurchased = updatePurchaseHistory(
          purchased,
          cartItems
        );

        setItemsPurchased(updatedItemsPurchased);

        //Purchase history only holds the latest 50 purchases
        if (updatedItemsPurchased.length > 50) {
          setItemsPurchased(updatedItemsPurchased.slice(0, 49));
        }

        localStorage.setItem("purchaseHistory", JSON.stringify(itemsPurchased));

        //update the cart
        setCartItems([]);
        localStorage.setItem("cartItems", JSON.stringify([]));

        alert("Email send", response);
      },
      (error) => {
        alert("Error", error);
      }
    );
  };

  return (
    <div className="purchase-items">
      <button onClick={sendEmail}>Send</button>
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
              name="HouseNumber_and_StreetName"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Apartment, Suite, Unit ,etc .(optional): "
              name="Apartment_or_Suite/Unit"
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
            name="PostCode_or_PinCode_or_ZipCode"
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
            name="additional_information"
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
        </div>

        {/*Product Details Table */}
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

      {cartItems.length > 0 && (
        <StripeCheckout
          stripeKey="Key="
          token={makePayment}
          name="Purchase Items"
        >
          <button className="purchase">Pay</button>
        </StripeCheckout>
      )}
    </div>
  );
}
