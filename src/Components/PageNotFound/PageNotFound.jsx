import Button from "../Button/Button";
import styles from "../Payments/Payments.module.css";
function PageNotFound() {
  function handleGoHome() {
    window.location.href = "/";
  }
  return (
    <div className={styles.paymentContainer}>
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/empty_404_3x_rgdw87"
        alt="Page not found"
      />
      <h1>Page Not Found</h1>
      <div>
        Uh-oh! Looks like the page you are trying to access, doesn&apos;t exist.
        Please start afresh.
      </div>
      <Button onClick={handleGoHome}>Go to Home</Button>
    </div>
  );
}

export default PageNotFound;
