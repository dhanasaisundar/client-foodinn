import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "../EmptyCart/EmptyCart.module.css";

function EmptyOrder() {
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
      <h2>There are no past orders</h2>
      <p>You can go to home page to view more restaurants</p>
      <Button type="rounded" onClick={handleHomeNav}>
        Explore our menu
      </Button>
    </div>
  );
}

export default EmptyOrder;
