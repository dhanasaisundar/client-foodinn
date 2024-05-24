import styles from "./Footer.module.css";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div>
          <div className={styles.logoContainer}>
            <img src={assets.logo_icon} alt="logo" />
            <div className={styles.logoInfo}>
              <h1>foodInn</h1>
              <h3>&copy;2024 FoodInn private Ltd.</h3>
            </div>
          </div>
        </div>
        <div>
          <h2>Company</h2>
          <p>About</p>
          <p>Careers</p>
          <p>Team</p>
          <p>FoodInn One</p>
          <p>FoodInn InstaMart</p>
          <p>FoodInn Genie</p>
        </div>
        <div className={styles.footerInfo}>
          <div>
            <h2>Contact US</h2>
            <p>Help & Support</p>
            <p>Partner with us</p>
            <p>Ride with us</p>
          </div>
          <div>
            <h2>Legal</h2>
            <p>Terms & Conditions</p>
            <p>Cookie Policy</p>
            <p>Privacy Policy</p>
          </div>
        </div>
        <div className={styles.delivery}>
          <h2>We deliver to</h2>
          <p>Bangalore</p>
          <p>Chennai</p>
          <p>Coimbatore</p>
          <p>Delhi</p>
          <p>Gurgaon</p>
          <p>Hyderabad</p>
          <p>Mumbai</p>
          <p>Pune</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
