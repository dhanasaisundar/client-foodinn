/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  if (to === "-1")
    return (
      <button className={styles.linkBtn} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to}>
      <button className={styles.linkBtn}>{children}</button>
    </Link>
  );
}

export default LinkButton;
