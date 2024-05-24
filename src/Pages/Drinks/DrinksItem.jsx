/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, getCart, getCurrentQuantityById } from "../Cart/cartSlice";
import Button from "../../Components/Button/Button";
import DeleteCartItem from "../../Components/CartButtons/DeleteCartBtn";
import UpdateItemQuantity from "../../Components/CartButtons/UpdateCartBtn";
import styles from "./Drinks.module.css";

function DrinkItem({ drink }) {
  const { drinkId, name, unitprice, imageUrl } = drink;
  const cart = useSelector(getCart);
  const isDrinkPresentInCart = cart.filter(
    (eachDrink) => eachDrink.itemId === drinkId
  ).length;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(drinkId));
  function handleCartBtn() {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }
    const cartDrink = {
      itemId: drinkId,
      image: imageUrl,
      name: name,
      quantity: 1,
      unitprice,
      totalPrice: unitprice * 1,
    };
    dispatch(addToCart(cartDrink));
  }
  return (
    <li className={styles.drinkContainer}>
      <img src={drink.imageUrl} className={styles.drinkImage} />
      <div className={styles.drinkInfo}>
        <div className={styles.drinkNameQuantity}>
          <h3>{name}</h3>
          <p>{drink.quantity}</p>
        </div>
        <div className={styles.operationalKeys}>
          <p>&#8377;{unitprice}</p>
          {isDrinkPresentInCart ? (
            <div className={styles.btns}>
              <UpdateItemQuantity
                id={drinkId}
                currentQuantity={currentQuantity}
              />
              <DeleteCartItem id={drinkId} />
            </div>
          ) : (
            <Button type="small" onClick={handleCartBtn}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default DrinkItem;
