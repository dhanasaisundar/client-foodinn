/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

import { handleAuthState } from "./authSlice";
import { assets } from "../../assets/assets";
import { userLogin } from "../../services/apiAuth";
import Loader from "../Loader/Loader";

function Login({ handleAuthBtn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function createBtnFn(args) {
    dispatch(handleAuthState(args));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const loginResponse = await userLogin(email, password);
      if (loginResponse.ok) {
        const data = await loginResponse.json();
        const decodedToken = jwtDecode(data.token);
        const userInfo = decodedToken.userInfo;
        const cartId = decodedToken.cartId;
        const cart = decodedToken.cart;
        localStorage.setItem("jwtToken", data.token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("cartId", cartId);
        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success(data.message);
        setLoading(false);
        handleAuthBtn();
        window.location.reload();
      } else {
        const errorData = await loginResponse.json();
        setLoading(false);
        toast.error(errorData.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Login Unsuccessful. Please try again");
    }
  }

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleOnSubmit}>
        <header>
          <div className="logo-container">
            <img
              src={assets.logo_icon}
              alt="logo"
              className="login-form-logo"
            />
            <h2>FoodInn</h2>
          </div>
          <div className="close-btn" onClick={handleAuthBtn}>
            <img src={assets.cross_icon_2} alt="cross icon" />
          </div>
        </header>
        <h3>Login in to FoodInn</h3>
        <div className="form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a href="#" className="login-form-fp">
          Forgot Password?
        </a>
        <button type="submit" disabled={loading}>
          {loading ? <Loader type="Logging in" /> : "Login"}
        </button>
        <span>
          Not Registered?
          <a
            href="#"
            className="login-form-ca"
            onClick={() => createBtnFn("signUp")}
          >
            Create Account
          </a>
        </span>
      </form>
    </div>
  );
}

export default Login;
