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

  //Fields are similar to the ones defined in Email js Template
  const [form, setForm] = useState({
    totalPrice: 0,
    discount: 0,
    finalPrice: 0,
    UserName: "",
    CompanyName: "Not Available",
    Country_or_Region: "",
    State_or_County: "",
    Town_or_City: "",
    HouseNumber_and_StreetName: "",
    Apartment_or_Suite_or_Unit: "None",
    PostCode_or_PinCode_or_ZipCode: "",
    Phone: "",
    EmailAddress: "",
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
                <span>OFCA Certification Program ${item.plan}</span>
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

  //to get the purchased date of the program
  const today = new Date();
  const purchasedDate = () => {
    const formattedDate = today.toISOString().split("T")[0];
    return formattedDate;
  };

  //Updating the purchase history
  const updatePurchaseHistory = (items, choices) => {
    let updatedItems = [...items];

    choices.forEach((element) => {
      const index = updatedItems.findIndex(
        (item) => item.level == element.level && item.plan == element.plan
      );

      if (index != -1) {
        updatedItems[index] = {
          ...updatedItems[index],
          purchasedOn: purchasedDate(),
          quantity: element.quantity,
        };
      } else {
        updatedItems.unshift({ ...element, purchasedOn: purchasedDate() });
      }
    });

    return updatedItems;
  };

  //Purchase Confirmation
  const completePurchase = () => {
    let purchased = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    const updatedItemsPurchased = updatePurchaseHistory(purchased, cartItems);

    setItemsPurchased(updatedItemsPurchased);
    //setItemsPurchased((prev) => ({...prev,purchasedOn:purchasedDate()}))

    localStorage.setItem(
      "purchaseHistory",
      JSON.stringify(updatedItemsPurchased)
    );

    //update the cart
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([]));

    //alert("Purchase Completed");
    navigate("/");
  };

  //Function to link the email js email service
  const sendEmail = () => {
    setForm({ ...form, products_table: generateProductsTable() });

    emailjs
      .send("service_44nolmr", "template_ud3pu5m", form, "7xzu1_S-S0TbFD6yt")
      .then(
        (response) => {
          alert("Purchase Completed");
          completePurchase();
        },
        (error) => {
          alert("Error", error);
        }
      );
  };

  //Connecting the stripe API
  const makePayment = async (token) => {
    for (let key in form) {
      if (form[key] == "") {
        alert(`Missing Field ${key}`);
        return;
      }
    }
    const body = {
      token,
      cartItems,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch("https://ofca-backend.vercel.app/payment", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.success) {
      alert("Payment successfull");
      sendEmail();
    } else {
      alert("Payment Failed");
    }
  };
  return (
    <div className="purchase-items">
       <button className="back-button" onClick={returnCart}>
        Back
      </button>
      {displayTimer && <div className="timer"></div>}

      <h1>CHECKOUT</h1>

      <form>
        <h2>Billing Details</h2>

        <div className="label">
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
        </div>
        <div className="label">
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
        </div>
        <div className="label">
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
        </div>
        <div className="label">
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
        </div>
        <div className="label">
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
              name="Apartment_or_Suite_or_Unit"
              onChange={(e) =>
                setForm({ ...form, [e.target.name]: e.target.value })
              }
            />
          </div>
        </div>

        <div className="label">
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
        </div>
        <div className="label">
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
        </div>
        <div className="label">
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
        </div>

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

      {(cartItems.length > 0 && !Object.values(form).some(val => val === '')) ? (
        <StripeCheckout
          stripeKey="pk_test"
          token={makePayment}
          name="Purchase Items"
        >
          <button className="purchase">Pay</button>
        </StripeCheckout>
      ):<span>Fill the billing details</span>}
    </div>
  );
}
