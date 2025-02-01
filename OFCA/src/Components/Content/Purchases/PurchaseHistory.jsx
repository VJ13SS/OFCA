import { useState } from "react";
import "./PurchaseHistory.css";

export default function PurchaseHistory({ itemsPurchased, setItemsPurchased }) {

  const historyItems = itemsPurchased.map((item, index) => {
    return (
      <div className="purchased-item" key={index}>
        <div className="item-icon">
          <img src="./Images/OFCA_ICON.png" alt="" />
        </div>
        <div className="purchased-item-details">
          <span>Level {item.level}</span>
          <span>
            {item.plan == "3 Monthly Payments"
              ? "OFCA Certification Program 3 Months"
              : "OFCA Certification Program Full Certification"}
          </span>

          <span>
            Price :{" "}
            <span style={{ color: "green" }}>
              {item.amount * item.quantity}
            </span>
          </span>
          <span>Quantity: {item.quantity}</span>
          <span>Purchased On: {item.purchasedOn}</span>
        </div>
      </div>
    );
  });

  const [displayTimer, setDisplayTimer] = useState(false);

  const clearPurchaseHistory = () => {
    confirm("Do You Wish to Clear the Purchase History?");
    
    localStorage.setItem("purchaseHistory", JSON.stringify([]));
    setItemsPurchased([]);
  };

  return (
    <div className="purchase-history">
      {displayTimer && <div className="timer"></div>}
      <h2>Your Purchase History</h2>
      <h6>*Refresh to load your purchases</h6>
      {itemsPurchased.length > 0 && (
        <button onClick={clearPurchaseHistory}>Clear All</button>
      )}

      {itemsPurchased.length == 0 && (
        <span>You haven't Purchased Anything Yet...!</span>
      )}
      <div className="purchased-items">{historyItems}</div>
    </div>
  );
}
