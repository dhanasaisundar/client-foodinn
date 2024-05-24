/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import styles from "./CartButtons.module.css";
import {
  decreaseItemQuantityInCart,
  increaseItemQuantityInCart,
} from "../../Pages/Cart/cartSlice";

function UpdateCartBtn({ id, currentQuantity }) {
  const dispatch = useDispatch();

  function increaseQuantity() {
    dispatch(increaseItemQuantityInCart(id));
  }

  function decreaseQuantity() {
    dispatch(decreaseItemQuantityInCart(id));
  }

  return (
    <div className={styles.updateControllersContainer}>
      <Button type="rounded" onClick={decreaseQuantity}>
        -
      </Button>
      <span className="text-sm">{currentQuantity}</span>
      <Button type="rounded" onClick={increaseQuantity}>
        +
      </Button>
    </div>
  );
}

export default UpdateCartBtn;
