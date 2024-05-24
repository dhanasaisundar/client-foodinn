/* eslint-disable react/prop-types */
import styles from "./Loader.module.css";

function Loader({type}) {
  return (
    <div className={styles.loading}>
      <span>{type}</span>
      <span className={styles.loadingDot1}>.</span>
      <span className={styles.loadingDot2}>.</span>
      <span className={styles.loadingDot3}>.</span>
    </div>
  );
}

export default Loader;
