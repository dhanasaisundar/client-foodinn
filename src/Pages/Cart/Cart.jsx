import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteCartItem from "../../Components/CartButtons/DeleteCartBtn";
import HrLine from "../../Components/HrLine/HrLine";
import Button from "../../Components/Button/Button";
import EmptyCart from "../../Components/EmptyCart/EmptyCart";
import styles from "./Cart.module.css";
import {
  decreaseItemQuantityInCart,
  getCart,
  getTotalCartPrice,
  increaseItemQuantityInCart,
} from "./cartSlice";

function Cart() {
  const navigate = useNavigate();
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalCartPrice);
  const deliveryFee = 5;
  const totalFee = totalPrice + deliveryFee;
  const isCartEmpty = cart.length === 0;
  const dispatch = useDispatch();
  function increaseQuantity(id) {
    dispatch(increaseItemQuantityInCart(id));
  }

  function decreaseQuantity(id) {
    dispatch(decreaseItemQuantityInCart(id));
  }

  return isCartEmpty ? (
    <EmptyCart />
  ) : (
    <div className={styles.cart}>
      <div className={styles.cartItems}>
        <div className={styles.cartItemsTitle}>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total Price</p>
          <p>Remove Item</p>
        </div>
        {/* <br /> */}
        <HrLine />

        {cart?.map((cartItem) => {
          return (
            <div key={cartItem.itemId}>
              <div
                className={`${styles.cartItemsTitle} ${styles.cartItemsItem}`}
              >
                <img src={cartItem.image} alt={cartItem.name} />
                <p>{cartItem.name}</p>
                <p>&#8377;{cartItem.unitprice}</p>
                <div className={styles.quantityBtns}>
                  <Button
                    type="rounded"
                    onClick={() => decreaseQuantity(cartItem.itemId)}
                  >
                    -
                  </Button>
                  <p>{cartItem.quantity}</p>
                  <Button
                    type="rounded"
                    onClick={() => increaseQuantity(cartItem.itemId)}
                  >
                    +
                  </Button>
                </div>

                <p>&#8377;{cartItem.totalPrice}</p>
                <p>
                  <DeleteCartItem id={cartItem.itemId} />
                </p>
              </div>
              <HrLine />
            </div>
          );
        })}
        <div className={styles.cartBottom}>
          <div className={styles.cartTotal}>
            <h2>Cart Totals</h2>
            <div className={styles.cartTotalDetails}>
              <p>Subtotal</p>
              <p>&#8377;{totalPrice}</p>
            </div>
            <hr />
            <div className={styles.cartTotalDetails}>
              <p>Delivery Fee</p>
              <p>&#8377;{deliveryFee}</p>
            </div>
            <hr />
            <div className={styles.cartTotalDetails}>
              <b>Total</b>
              <b> &#8377;{totalFee}</b>
            </div>
            <Button onClick={() => navigate("/order")}>
              Proceed to checkout
            </Button>
          </div>
          <div className={styles.promoCode}>
            <div>
              <p>If you have a promo code, Enter here</p>
              <div className={styles.promoCodeInput}>
                <input type="text" placeholder="Apply your promo code here" />
                <Button type="rounded">Apply</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
