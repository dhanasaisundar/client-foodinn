import styles from "./ExploreMenu.module.css";

// eslint-disable-next-line react/prop-types
function ExploreMenuItem({ itemImage, itemName, category, handleCategoryBtn }) {
  return (
    <li className={styles.menuItem} onClick={() => handleCategoryBtn(itemName)}>
      <img
        src={itemImage}
        alt={itemName}
        className={category === itemName ? `${styles.active}` : ""}
      />
      <p>{itemName}</p>
    </li>
  );
}

export default ExploreMenuItem;
