/* eslint-disable react/prop-types */
import Register from "./Register";
import Login from "./Login";
import { useSelector } from "react-redux";
import { getAuthState } from "./authSlice";

function Auth({ handleAuthBtn }) {
  const authState = useSelector(getAuthState);
  return (
    <>
      {authState === "signUp" && <Register handleAuthBtn={handleAuthBtn} />}
      {authState === "login" && <Login handleAuthBtn={handleAuthBtn} />}
    </>
  );
}

export default Auth;
