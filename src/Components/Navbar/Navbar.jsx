/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { getCart } from "../../Pages/Cart/cartSlice";
import styles from "./Navbar.module.css";

function Navbar({ handleAuthBtn }) {
  const [hamMenu, setHamMenu] = useState(false);
  const cart = useSelector(getCart);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isUserLoggedIn = userInfo?.username ? true : false;

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logoContainer}>
        <img src={assets.logo_icon} alt="logo" />
        <h1>foodInn</h1>
      </div>
      <div className={styles.navMenu}>
        <li>
          <NavLink className="link" to="/">
            <img src={assets.home_icon} alt="home-icon" />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="link" to="/drinks">
            <img src={assets.drinks_icon} alt="drinks-icon" />
            <span>Drinks</span>
          </NavLink>
        </li>
        <li>
          <div className={styles.cartContainer}>
            {cart.length > 0 ? (
              <p className={styles.cartLength}>{cart.length}</p>
            ) : (
              ""
            )}
            <div className={styles.cartLink}>
              <NavLink className="link " to="/cart">
                <img src={assets.basket_icon} alt="basket-icon" />
                <span>Cart</span>
              </NavLink>
            </div>
          </div>
        </li>
        <li>
          <NavLink className="link" to="/orders">
            <img src={assets.shopping_bag} alt="shopping-bag" />
            <span>Orders</span>
          </NavLink>
        </li>
      </div>
      <div className={styles.navIcons}>
        {isUserLoggedIn ? (
          <NavLink className={styles.profile} to="/account">
            <img
              src="https://res.cloudinary.com/dq6ad18dk/image/upload/v1714287819/icons8-male-user-48_xtwhqn.png"
              alt="profile"
            />
            <h2 className={styles.username}>{userInfo.username}</h2>
          </NavLink>
        ) : (
          <button className={styles.signIn} onClick={handleAuthBtn}>
            Sign In
          </button>
        )}
      </div>
      <div className={styles.hamburgerCon}>
        <button type="button" onClick={() => setHamMenu(!hamMenu)}>
          <img src={assets.hamburger_icon} alt="hamburger icon" />
        </button>
        {hamMenu && (
          <div className={styles.hamburgerMenu}>
            <NavLink className={styles.navLinks} to="/">
              Home
            </NavLink>
            <NavLink className={styles.navLinks} to="/drinks">
              Drinks
            </NavLink>
            <NavLink className={styles.navLinks} to="/cart">
              Cart
            </NavLink>
            <NavLink className={styles.navLinks} to="/orders">
              Orders
            </NavLink>
            <NavLink
              className={styles.navLinks}
              to={userInfo ? "/account" : ""}
              onClick={() => {
                userInfo ? null : handleAuthBtn();
              }}
            >
              {userInfo ? "Profile" : "SignUp"}
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

{
  /* <img src={assets.search_icon} alt="search-icon" />
        <div>
          
          <div className={styles.dot}></div>
        </div> */
  /*
  By passing getCart (without parentheses), you are passing the selector function itself, which useSelector will call with the store as an argument.

  If you pass getCart(), you are passing the result of calling the getCart function, not the function itself, and useSelector won't work correctly.
  
  */
}
