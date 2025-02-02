import { useState } from "react";
import "./PurchaseHistory.css";
import { useNavigate } from "react-router-dom";

export default function PurchaseHistory({ itemsPurchased }) {
  itemsPurchased.sort((item1, item2) => item1.level - item2.level);
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

  const navigate = useNavigate();
  const returnHome = () => {
    setDisplayTimer(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  
  return (
    <div className="purchase-history">
      {displayTimer && <div className="timer"></div>}
      <button className="back-button" onClick={returnHome}>
        Back
      </button>
      <h2>Your Purchase History</h2>
      <h6>*Refresh to load your latest purchases purchases</h6>
      {itemsPurchased.length == 0 && (
        <span>You haven't Purchased Anything Yet...!</span>
      )}
      <div className="purchased-items">{historyItems}</div>
    </div>
  );
}
