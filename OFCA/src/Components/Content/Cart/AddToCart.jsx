import { useEffect, useState } from "react";
import "./AddToCart.css";
import { useNavigate } from "react-router-dom";

export default function AddToCart({ setCartItems,itemsPurchased,cartItems }) {
  const [userPrograms, setUserPrograms] = useState([]); // to hold the plans selected by the user

  useEffect(() => {
    setUserPrograms(JSON.parse(localStorage.getItem("userSelections")) || []);
    userPrograms.sort((item1, item2) => item1.level - item2.level);

    itemsPurchased.sort((item1, item2) => item1.level - item2.level)
  }, []);

  //To update the quantites of the items purchased
  const updateQuantity = (option, level) => {
    console.log(option, level);
    setUserPrograms((prev) =>
      prev.map((item) => {
        if (item.level === level) {
          if (option == "increment") {
            return { ...item, quantity: item.quantity + 1 };
          } else if (option == "decrement" && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  //Date
  const today = new Date();
  today.setMonth(today.getMonth() + 1)
 
  //to show the renewal dates and the time period for each plan
  const getDates = (period) =>{
    return today.toISOString().split('T')[0]
  }
  
  //Each choice is provied a respective color for identification
  const userChoices = userPrograms.map((item, index) => {
    return (
      <div
        className="selectedPlan"
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
        }}
      >
        <div className="ofca-image">
          <img src="./Images/OFCA_ICON.png" alt="" />
        </div>
        <div className="plan-details">
          <div
            className="container"
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
            }}
          >
            <span>Level {item.level}</span>
          </div>
          <h2>
            {item.plan == "3 Monthly Payments"
              ? "OFCA Certification Program 3 Months"
              : "OFCA Certification Program Full Certification"}
          </h2>
          <span style={{ marginRight: "25px" }}>
            Price : <span style={{ color: "green" }}>{item.amount}</span>
          </span>
          <span>
            Availability: <span style={{ color: "green" }}>In Stock</span>
          </span>
          <div className="product-options-container">
            <span>Qty</span>
            <div className="product-options">
              <div className="product-quantity">
                <button onClick={() => updateQuantity("decrement", item.level)}>
                  -
                </button>
                <div className="product-content">
                  <span>{item.quantity}</span>
                </div>
                <button onClick={() => updateQuantity("increment", item.level)}>
                  +
                </button>
              </div>
            </div>
          </div>
          {item.plan == "3 Monthly Payments" &&<span>{`Next Renewal ${getDates(1)}`}</span>}
        </div>
      </div>
    );
  });

  //To add the user choices to their cart
  const updateCart = (items, choices) => {
    let updatedItems = [...items];

    choices.forEach((element) => {
      const index = updatedItems.findIndex(
        (item) => item.level == element.level && item.plan == element.plan
      );

      // Quantity wont drop below 1
      if (index != -1) {
        updatedItems[index].quantity += element.quantity;
      } else {
        updatedItems.unshift({ ...element });
      }
    });

    return updatedItems;
  };

  const navigate = useNavigate();

  //to check if the user had purchased or is purchasing all the previous levels with respect to the lowest level selecetd inorder to add to the cart
  const checkItems = () => {
    
    for(let i = 1; i<userPrograms.at(-1).level;i++){
      if(!(userPrograms.some((item) => item.level == i) || cartItems.some((item) => item.level == i) || itemsPurchased.some((item) => item.level == i))){
        alert(`You have't purchased Level ${i}.Purchase Level ${i} to purchase the higher levels`)
        return false
      }
    }
    return true
  }

  const pushToCart = () => {
    
    if(!checkItems()){
      navigate("/");
      return
    }

    //Get the cart items of users from the local storage
    let inCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    //Add the users choices to their cart and updating the local storage
    const updatedInCart = updateCart(inCart, userPrograms);
    setUserPrograms(updatedInCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedInCart));
    setCartItems(updatedInCart);

    alert("Added to cart");
    navigate("/");
  };

  return (
    <div className="product-selections">
      <h2>YOUR CHOICES</h2>
      <div className="user-choices">{userChoices}</div>
      <button className="add-to-cart" onClick={pushToCart}>
        SUBSCRIBE NOW
      </button>
    </div>
  );
}
