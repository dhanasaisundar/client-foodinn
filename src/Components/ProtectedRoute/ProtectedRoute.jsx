import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children, handleAuthBtn }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  useEffect(
    function () {
      if (!token) {
        handleAuthBtn();
      }
    },
    [token, navigate, handleAuthBtn]
  );

  return children;
}

export default ProtectedRoute;
