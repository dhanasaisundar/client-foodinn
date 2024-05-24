/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getCart,
  getCurrentQuantityById,
} from "../../Pages/Cart/cartSlice";
import { assets } from "../../assets/assets";
import UpdateCartBtn from "../CartButtons/UpdateCartBtn";
import DeleteCartItem from "../CartButtons/DeleteCartBtn";
import Button from "../Button/Button";
import styles from "./FoodMenu.module.css";
import toast from "react-hot-toast";

function FoodMenuItem({ item }) {
  const { _id, name, price, image, description, rating } = item;
  const cart = useSelector(getCart);
  const isItemInCart = cart.filter((ele) => ele.itemId === _id).length;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(_id));
  function handleAddCartBtn() {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      toast("Please login to add items to cart", {
        duration: 5000,
        icon: "⚠️",
      });
      return;
    }
    const newItem = {
      itemId: _id,
      image: image,
      name: name,
      quantity: 1,
      unitprice: price,
      totalPrice: price * 1,
    };
    dispatch(addToCart(newItem));
  }
  return (
    <div className={styles.foodMenuItem}>
      <img src={image} alt={name} className={styles.foodImg} />
      <div className={styles.infoContainer}>
        <div className={styles.foodInfo}>
          <p>{name}</p>
          <div className={styles.ratingContainer}>
            <img src={assets.rating_star_icon} alt="Star Rating" />
            <span>{rating}</span>
          </div>
        </div>
        <p>{description}</p>
        <div className={styles.cartBtnCon}>
          <p className={styles.price}>&#8377; {price}</p>
          {isItemInCart ? (
            <div className={styles.btns}>
              <UpdateCartBtn id={_id} currentQuantity={currentQuantity} />
              <DeleteCartItem id={_id} />
            </div>
          ) : (
            <Button type="small" onClick={handleAddCartBtn}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodMenuItem;
