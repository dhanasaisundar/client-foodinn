import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getCart,
  getTotalCartPrice,
  getTotalCartQuantity,
} from "../../Pages/Cart/cartSlice";
import Button from "../Button/Button";
import styles from "./Payments.module.css";
import { apiOrder } from "../../services/apiOrder";
import toast from "react-hot-toast";

function SuccessfulPayment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const totalPaid = totalCartPrice + 5;
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    async function storeOrders() {
      try {
        console.log("api call");
        await apiOrder(cart, totalCartPrice, totalPaid, totalQuantity);
      } catch (error) {
        console.log(error);
        toast.error("Error saving order");
      }
    }
    storeOrders();
  }, [cart, totalCartPrice, totalPaid, totalQuantity]);

  function handleHomeBtn() {
    dispatch(clearCart());
    navigate("/");
  }

  return (
    <div className={styles.paymentContainer}>
      <img
        src="https://res.cloudinary.com/dq6ad18dk/image/upload/v1712991838/icons8-tick-64_vadxuo.png"
        alt="success"
      />
      <h1>Your Payment was Successful</h1>
      <Button
        type="button"
        bgColor="#27b348"
        color="#fff"
        onClick={handleHomeBtn}
      >
        Back to Home
      </Button>
    </div>
  );
}

export default SuccessfulPayment;

