import "./Pricings.css";
import { pricing_details } from "./PricingData";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Pricings() {
  const navigate = useNavigate();

  const [pricings, setPricings] = useState(pricing_details);

  const purchasedDate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    return formattedDate;
  };

  const selectProgram = (id, selectedPlan) => {
    setPricings((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              plan: selectedPlan,
              amount: selectedPlan == "3 Monthly Payments" ? 250 : 700,
              selected: true,
              purchasedOn: purchasedDate(),
            }
          : item
      )
    );
  };

  const unSelectProgram = (id) => {
    console.log("Hello");
    setPricings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: false, purchasedOn: "" } : item
      )
    );
  };

  const anySelection = pricings.some((item) => item.selected);
  const selections = pricings.filter((item) => item.selected);
  const [displayTimer, setDisplayTimer] = useState(false);

  const proceedSelections = () => {
    setDisplayTimer(true);
    localStorage.setItem("userSelections", JSON.stringify(selections));
    setTimeout(() => {
      navigate("/add-to-cart");
      setDisplayTimer(false);
    }, 2000);
  };

  const pricingData = pricings.map((item, index) => {
    return (
      <div
        className="pricing"
        key={index}
        style={{
          border:
            item.level == 1
              ? "3px solid rgb(14,141,204)"
              : item.level == 2
              ? "3px solid black"
              : item.level == 3
              ? "3px solid red"
              : item.level == 4
              ? "3px solid orange"
              : "3px solid rgb(12,176,26)",
          boxShadow: item.selected
            ? "-5px 0 10px rgba(0,0,0,0.25), 5px 0 10px rgba(0,0,0,0.25),0 5px 10px rgba(0,0,0,0.25),0 -5px 10px rgba(0,0,0,0.25)"
            : "",
        }}
      >
        <AiOutlineClose
          className="close"
          style={{ display: item.selected ? "block" : "none" }}
          onClick={() => {
            unSelectProgram(item.id);
          }}
        />
        <span
          className="pricings-container"
          style={{
            border:
              item.level == 1
                ? "2px solid rgb(14,141,204)"
                : item.level == 2
                ? "2px solid black"
                : item.level == 3
                ? "2px solid red"
                : item.level == 4
                ? "2px solid orange"
                : "2px solid rgb(12,176,26)",
          }}
        >
          <span>Level {item.level}</span>
        </span>
        <h3>ONLINE FITNESS COACHING ACADEMY CERTIFICATION</h3>
        <p>{item.description}</p>

        <h1>
          $250<span>/mo</span>
        </h1>
        <span>Prices are marked in USD</span>
        <span>Choose your Plan</span>
        <div className="pricing-selections">
          <div
            onClick={() => selectProgram(item.id, "3 Monthly Payments")}
            style={{
              border:
                item.level == 1
                  ? "3px solid rgb(14,141,204)"
                  : item.level == 2
                  ? "3px solid black"
                  : item.level == 3
                  ? "3px solid red"
                  : item.level == 4
                  ? "3px solid orange"
                  : "3px solid rgb(12,176,26)",
              backgroundColor: item.selected
                ? item.plan == "3 Monthly Payments"
                  ? item.level == 1
                    ? "rgb(14,141,204)"
                    : item.level == 2
                    ? "black"
                    : item.level == 3
                    ? "red"
                    : item.level == 4
                    ? "orange"
                    : "rgb(12,176,26)"
                  : ""
                : "",
              color: item.selected
                ? item.plan == "3 Monthly Payments"
                  ? "white"
                  : ""
                : "",
            }}
          >
            <span>3 Monthly Payments</span>
          </div>
          <div
            onClick={() => selectProgram(item.id, "Full Payment Upfront")}
            style={{
              border:
                item.level == 1
                  ? "3px solid rgb(14,141,204)"
                  : item.level == 2
                  ? "3px solid black"
                  : item.level == 3
                  ? "3px solid red"
                  : item.level == 4
                  ? "3px solid orange"
                  : "3px solid rgb(12,176,26)",
              backgroundColor: item.selected
                ? item.plan == "Full Payment Upfront"
                  ? item.level == 1
                    ? "rgb(14,141,204)"
                    : item.level == 2
                    ? "black"
                    : item.level == 3
                    ? "red"
                    : item.level == 4
                    ? "orange"
                    : "rgb(12,176,26)"
                  : ""
                : "",
              color: item.selected
                ? item.plan == "Full Payment Upfront"
                  ? "white"
                  : ""
                : "",
            }}
          >
            <span>Full Payment Upfront</span>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="pricings" id="pricing-section">
      <div className="pricings-header">
        <h2>OUR PROGRAMS</h2>
      </div>
      <h5>
        **You Can Select Multiple Programs by Selecting the respective Plans...!
      </h5>
      <div className="pricings-details">{pricingData}</div>
      {anySelection && (
        <div className="proceed-selections">
          <span>Programs selected : {selections.length}</span>
          <button onClick={proceedSelections}>Proceed</button>
        </div>
      )}

      {displayTimer && <div className="pricings-timer"></div>}
    </div>
  );
}
