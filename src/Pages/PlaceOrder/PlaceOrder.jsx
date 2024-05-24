import { useState } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { getCart, getTotalCartPrice } from "../Cart/cartSlice";
import { userInfoUpdate } from "../../services/apiAuth";
import Button from "../../Components/Button/Button";
import styles from "./PlaceOrder.module.css";
import cartStyles from "../Cart/Cart.module.css";
import toast from "react-hot-toast";

function PlaceOrder() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [name, setName] = useState(userInfo.username || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [address1, setAddress1] = useState(userInfo.address1 || "");
  const [address2, setAddress2] = useState(userInfo.address2 || "");
  const [city, setCity] = useState(userInfo.city || "");
  const [state, setState] = useState(userInfo.state || "");
  const [pincode, setPincode] = useState(userInfo.pincode || "");
  const [country, setCountry] = useState(userInfo.country || "");
  const [phone, setPhone] = useState(userInfo.phoneNumber || "");
  const [loading, setLoading] = useState(false);

  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalCartPrice);
  const totalFee = totalPrice + 5;

  async function saveChanges(e) {
    e.preventDefault();
    setLoading(true);

    const updatedUserInfo = {
      userId: userInfo?.userId,
      username: name,
      email: email,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      pincode: pincode,
      country: country,
      phoneNumber: phone,
    };
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    try {
      const userInfoResponse = await userInfoUpdate(updatedUserInfo);
      const data = await userInfoResponse.json();
      if (userInfoResponse.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  }

  async function makePayment(e) {
    e.preventDefault();
    const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

    try {
      const stripe = await loadStripe(stripePublicKey);
      const customer = {
        name: name,
        address: {
          line1: userInfo.address1,
          line2: userInfo.address2,
          city: city,
          state: state,
          postal_code: pincode,
          country: country,
        },
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: cart, customer: customer }),
      };

      const response = await fetch(
        "https://apis-foodin-1.onrender.com/api/payments/create-checkout-session",
        options
      );

      if (!response.ok) {
        console.error(
          "Failed to create checkout session:",
          response.statusText
        );
        return;
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  }

  return (
    <form className={styles.placeOrder} onSubmit={saveChanges}>
      <div className={styles.placeOrderLeft}>
        <p className={styles.title}>Delivery Information</p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address line 1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address line 2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <input
          type="tele"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">{loading ? "Saving..." : "Save Info"}</button>
      </div>
      <div className={styles.placeOrderRight}>
        <div className={cartStyles.cartTotal}>
          <h2>Cart Totals</h2>
          <div className={cartStyles.cartTotalDetails}>
            <p>Subtotal</p>
            <p>&#8377;{totalPrice}</p>
          </div>
          <hr />
          <div className={cartStyles.cartTotalDetails}>
            <p>Delivery Fee</p>
            <p>&#8377; 5</p>
          </div>
          <hr />
          <div className={cartStyles.cartTotalDetails}>
            <b>Total</b>
            <b> &#8377;{totalFee}</b>
          </div>
          <Button onClick={makePayment}>
            {loading ? "Loading..." : "Pay Now"}{" "}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
