import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./EmptyCart.module.css";

function EmptyCart() {
  const navigate = useNavigate();
  function handleHomeNav() {
    navigate("/");
  }
  return (
    <div className={styles.emptyCart}>
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
        alt="Empty Cart"
      />
      <h2>Cart is empty</h2>
      <p>You can go to home page to view more restaurants</p>
      <Button type="rounded" onClick={handleHomeNav}>
        Explore our menu
      </Button>
    </div>
  );
}

export default EmptyCart;
