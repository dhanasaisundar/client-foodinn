/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { assets } from "../../assets/assets";
import { useDispatch } from "react-redux";
import { handleAuthState } from "./authSlice";
import { registerUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

const lengthRegex = /.{8,}/;
const capitalLetterRegex = /[A-Z]/;
const numberRegex = /[0-9]/;
const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register({ handleAuthBtn }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  function handleAuthStateFn(args) {
    dispatch(handleAuthState(args));
  }
  const handlePasswordChange = (password) => {
    setPassword(password);
    setIsPasswordMatch(confirmPassword === password && password !== "");
  };

  const handleConfirmPasswordChange = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
    setIsPasswordMatch(confirmPassword === password && password !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const registerResponse = await registerUser(
      name,
      email,
      password,
      confirmPassword
    );
    try {
      const data = await registerResponse.json();
      if (registerResponse.ok) {
        setLoading(false);
        toast.success(data.message);
        handleAuthStateFn("login");
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("User registration failed. Please try again");
    }
  };

  return (
    <div className="login-bg">
      <form className="login-form" onSubmit={handleSubmit}>
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
        <h3>Register to FoodInn</h3>
        <div className="form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">
            Email
            <img
              src={assets.asterisk_icon}
              alt="asterisk"
              className="asterisk"
            />
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email address"
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailValid(() => emailRegex.test(e.target.value));
            }}
          />
          {email === "" ? null : (
            <div className="password-requirements">
              <p>
                {email === ""
                  ? null
                  : isEmailValid
                  ? "Valid Email Address ✅"
                  : "Please Enter a Valid Email Address ❌"}
              </p>
            </div>
          )}

          <label htmlFor="password">
            Password
            <img
              src={assets.asterisk_icon}
              alt="asterisk"
              className="asterisk"
            />
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          {password === "" ? null : (
            <div className="password-requirements">
              <p>
                Password must contain at least 8 characters{" "}
                <span>{lengthRegex.test(password) ? "✅" : "❌"}</span>
              </p>
              <p>
                Password must contain at least one number{" "}
                <span>{numberRegex.test(password) ? "✅" : "❌"}</span>
              </p>
              <p>
                Password must contain at least one special character{" "}
                <span>{specialCharRegex.test(password) ? "✅" : "❌"}</span>
              </p>
              <p>
                Password must contain at least one capital letter{" "}
                <span>{capitalLetterRegex.test(password) ? "✅" : "❌"}</span>
              </p>
            </div>
          )}

          <label htmlFor="confirm-password">
            Confirm Password
            <img
              src={assets.asterisk_icon}
              alt="asterisk"
              className="asterisk"
            />
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            placeholder="Confirm your password"
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          />
          {confirmPassword === "" ? null : (
            <div className="password-requirements">
              <p>
                {confirmPassword === ""
                  ? null
                  : isPasswordMatch
                  ? "Password matched ✅"
                  : "Password did not match ❌"}
              </p>
            </div>
          )}
        </div>

        <button type="submit" disabled={!isEmailValid || !isPasswordMatch}>
          {loading ? <Loader type="Loading" /> : "Sign up"}
        </button>
        <p>
          Already have an Account?
          <a
            href="#"
            className="login-form-ca"
            onClick={() => handleAuthStateFn("login")}
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
