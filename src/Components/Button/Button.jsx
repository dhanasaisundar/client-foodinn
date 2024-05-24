/* eslint-disable react/prop-types */
import styles from "./Button.module.css";

function Button({ children, type, bgColor, color, onClick }) {
  const fntColor = color ? color : "#111827";
  const btnBgColor = bgColor ? bgColor : "#facc15";
  return (
    <button
      type={type}
      className={styles.primary}
      onClick={onClick}
      style={{ backgroundColor: btnBgColor, color: fntColor }}
    >
      {children}
    </button>
  );
}

export default Button;
