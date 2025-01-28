import { useState, useEffect } from "react";
import "./App.css";
import Content from "./Components/Content/Content";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/NavBar/Navbar";
import { Route, Routes } from "react-router-dom";
import AddToCart from "./Components/Content/Cart/AddToCart";
import Cart from "./Components/Content/Cart/Cart";
import PurchaseItems from "./Components/Content/Purchases/purchaseItems";
import PurchaseHistory from "./Components/Content/Purchases/PurchaseHistory";

export default function App() {
  //localStorage.clear()
  const [cartItems, setCartItems] = useState([]);
  const [itemsPurchased, setItemsPurchased] = useState([]);
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
    cartItems.sort((item1,item2) => (item1 - item2))
    setItemsPurchased(
      JSON.parse(localStorage.getItem("purchaseHistory")) || []
    );
  }, []);

  const selectedLevels = new Set();
  cartItems.forEach((item) => {
    selectedLevels.add(item.level);
  });

  const discount =
    selectedLevels.size <= 1 ? 0 : 400 / 2 ** (5 - selectedLevels.size); // 2 levels $50 3 levels $100 4 levels $200 5 levels $400 discount
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.amount * item.quantity,
    0
  );

  return (
    <div className="app">
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/add-to-cart" element={<AddToCart setCartItems={setCartItems} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
              discount={discount}
              totalPrice={totalPrice}
            />
          }
        />
        <Route
          path="/purchase-items"
          element={
            <PurchaseItems
              cartItems={cartItems}
              setCartItems={setCartItems}
              discount={discount}
              totalPrice={totalPrice}
              setItemsPurchased={setItemsPurchased}
              itemsPurchased={itemsPurchased}
            />
          }
        />
        <Route
          path="/purchase-history"
          element={<PurchaseHistory itemsPurchased={itemsPurchased} setItemsPurchased = {setItemsPurchased}/>}
        />
      </Routes>

      <Footer />
    </div>
  );
}
