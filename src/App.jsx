import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./Pages/Home/Home";
import AppLayout from "./AppLayout";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import SuccessfullPayment from "./Components/Payments/SuccessfullPayment";
import CancelledPayment from "./Components/Payments/CancelledPayment";
import Orders from "./Pages/Orders/Orders";
import Drinks from "./Pages/Drinks/Drinks";
import Account from "./Pages/Account/Account";
import PageNotFound from "./Components/PageNotFound/PageNotFound";

function App() {
  const [auth, setAuth] = useState(false);
  function handleAuthBtn() {
    setAuth((prevState) => !prevState);
  }
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<AppLayout auth={auth} handleAuthBtn={handleAuthBtn} />}
          >
            <Route index element={<Home />} />
            <Route
              path="/cart"
              element={<Cart handleAuthBtn={handleAuthBtn} />}
            />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/drinks" element={<Drinks />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="/payment/successfull" element={<SuccessfullPayment />} />
          <Route path="/payment/cancel" element={<CancelledPayment />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "15px",
        }}
        toastOptions={{
          success: {
            duration: 1000,
          },
          error: {
            duration: 5000,
          },

          style: {
            borderRadius: "12px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-900)",
            padding: "12px",
            fontSize: "16px",
            fontWeight: "600",
            textAlign: "center",
            fontFamily: "outfit",
          },
        }}
      />
    </>
  );
}

export default App;
