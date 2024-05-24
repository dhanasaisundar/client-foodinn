/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import { deleteFromCart } from "../../Pages/Cart/cartSlice";

function DeleteCartItem({ id }) {
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch(deleteFromCart(id));
  }

  return (
    <Button type="small" onClick={handleDelete}>
      Remove
    </Button>
  );
}

export default DeleteCartItem;
