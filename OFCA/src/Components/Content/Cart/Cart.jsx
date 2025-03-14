import { useEffect, useState } from "react";
import "./Cart.css";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cart({
  cartItems,
  setCartItems,
  discount,
  totalPrice,
  itemsPurchased
}) {
  
  cartItems.sort((item1, item2) => item1.level - item2.level);

  //Update the quantities
  const updateQuantity = (option, level, plan) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.level === level && item.plan === plan) {
          if (option == "increment") {
            return { ...item, quantity: item.quantity + 1 };
          } else if (option == "decrement" && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  //Delete the Items
  const deleteItem = (level, plan) => {
    if(!confirm("Do you want to delete the item from the cart?")){
      return
    }
    
    const newCartItems = cartItems.filter(
      (item) => !(item.level === level && item.plan === plan)
    );

    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  //Date
  const today = new Date();
  today.setMonth(today.getMonth() + 1)
 
  //to show the renewal dates and the time period for each plan
  const getDates = (period) =>{
    return today.toISOString().split('T')[0]
  }

  //Cart Items
  const items = cartItems.map((item, index) => {
    return (
      <div className="cart-item" key={index} >
        <div className="item-icon">
          <img src="./Images/OFCA_ICON.png" alt="" />
        </div>
        <div className="cart-item-details">
          <span style={{
            fontWeight:'bold',
        color:
          item.level == 1
            ?  "rgb(14,141,204)"
            : item.level == 2
            ? "black"
            : item.level == 3
            ? "red"
            : item.level == 4
            ? "orange"
            : "rgb(12,176,26)",
            textDecoration:'underline'
      }}>Level {item.level}</span>
          <span>
            {item.plan == "3 Monthly Payments"
              ? "OFCA Certification Program 3 Months"
              : "OFCA Certification Program Full Certification"}
          </span>
          <span>
            Price : <span style={{ color: "green" }}>{item.plan == "3 Monthly Payments" ?'$250/month':'$700'}</span>
          </span>
          <span>
            Total Price :{" "}
            <span style={{ color: "green" }}>
            {item.plan == "3 Monthly Payments" ?'$250/month':item.amount * item.quantity}
            </span>
          </span>
          <div className="cart-item-quantity">
            <button
              onClick={() => updateQuantity("decrement", item.level, item.plan)}
            >
              -
            </button>
            <span>Quantity: {item.quantity}</span>
            <button
              onClick={() => updateQuantity("increment", item.level, item.plan)}
            >
              +
            </button>
          </div>
          {item.plan == "3 Monthly Payments" ?<span>3 Monthly Payments</span>:<span>Full Payment Upfront</span>}
          {item.plan == "3 Monthly Payments" &&<span>{`Next Renewal ${getDates(1)}`}</span>}
        
        </div>
        <FaTrash
          onClick={() => deleteItem(item.level, item.plan)}
          style={{ cursor: "pointer" }}
        />
      </div>
    );
  });

  const [displayTimer, setDisplayTimer] = useState(false);
  const navigate = useNavigate();

  //to navigate to the /purchase-items link
  const purchaseItems = () => {
    
    setDisplayTimer(true);
    setTimeout(() => {
      navigate("/purchase-items");
    }, 2000);
  };

  //to navigate to the home page
  
  const returnHome = () => {
    setDisplayTimer(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="cart">
      {displayTimer && <div className="timer"></div>}
      <button className="back-button" onClick={returnHome}>
        Back
      </button>
      <h5>**Refresh to load your Cart Items</h5>
      <h1>Your Cart</h1>

      {items.length != 0 ? (
        <div className="cart-header">
          <span>
            Total Price: ${totalPrice - discount}{" "}
            {discount > 0 && (
              <span style={{ textDecoration: "line-through" }}>
                ${totalPrice}
              </span>
            )}
          </span>
          <button onClick={purchaseItems}>
            Proceed to buy {cartItems.length} Items
          </button>
        </div>
      ) : (
        <span>No Items In Cart</span>
      )}
      {items}
    </div>
  );
}
