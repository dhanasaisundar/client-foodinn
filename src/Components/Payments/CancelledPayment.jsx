import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./Payments.module.css";

function CancelledPayment() {
  const navigate = useNavigate();
  function handleHomeBtn() {
    navigate("/");
  }
  return (
    <div className={styles.paymentContainer}>
      <img
        src="https://res.cloudinary.com/dq6ad18dk/image/upload/v1712991884/icons8-cancel-64_vo1i3a.png"
        alt="success"
      />
      <h2>Your Payment was Cancelled</h2>
      <Button
        type="button"
        bgColor=" #FF5733 "
        color="#fff"
        onClick={handleHomeBtn}
      >
        Back to Home
      </Button>
    </div>
  );
}

export default CancelledPayment;
