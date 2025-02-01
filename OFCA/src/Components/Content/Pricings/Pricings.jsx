import "./Pricings.css";
import { pricing_details } from "./PricingData";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Pricings({itemsPurchased, cartItems }) {

  const [pricings, setPricings] = useState(pricing_details);

  const anySelection = pricings.some((item) => item.selected);//to check if the user had selected any program
  const selections = pricings.filter((item) => item.selected);// to filter the selected items

  const [displayTimer, setDisplayTimer] = useState(false);
  const navigate = useNavigate();

  //Function which runs when a program is selected
  const selectProgram = (id, selectedPlan) => {
    setPricings((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              plan: selectedPlan,
              amount: selectedPlan == "3 Monthly Payments" ? 250 : 700,
              selected: true,
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

  //to check for successive selections
  const checkSelections = (lowestLevel,highestLevel) => {

    for(let i = 1;i <= highestLevel ;i++){
      if(!selections.some((item) => item.level == i) || itemsPurchased.some((item) => item.level == i) || cartItems.some((item) => item.level == i)){
        alert(`You can purchase levels one after the other. Ensure you have purchased all the previous levels or had added to the cart for purcgYou haven't purchase Level ${i} neither it is in your cart.`)
        return false
      }
    }
    return true
  }

  //Proceed with the selections to add to the cart
  //selected items are added to the cart rather than keeping in the state variables is to prevent the resetting of state when the page refreshes
  //Other methods can be used.How ever finite number of items(max 5) will be added to the local storage and will be cleared as soon as they are added to cart

  const proceedSelections = () => {
    

    selections.sort((item1, item2) => item1.level - item2.level);
    
    const lowestLevel = selections[0].level;//lowest selected level
    const highestLevel = selections.at(-1).level;//highest selected level

    /*
    if(!checkSelections(lowestLevel,highestLevel)){
      return
    }*/

    setDisplayTimer(true);
    localStorage.setItem("userSelections", JSON.stringify(selections));

    setTimeout(() => {
      navigate("/add-to-cart");
      setDisplayTimer(false);
    }, 2000);
  };

  //Each Level is represented by a specific color
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
