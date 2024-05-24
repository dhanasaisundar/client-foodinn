/* eslint-disable no-unused-vars */
import { foodList } from "../../assets/assets";
import FoodMenuItem from "./FoodMenuItem";
import styles from "./FoodMenu.module.css";

// eslint-disable-next-line react/prop-types
function FoodMenu({ category }) {
  return (
    <div className={styles.foodMenuContainer}>
      <h1>Top dishes near you</h1>
      <div
        className={`${
          category === "All"
            ? styles.foodListContainerAll
            : styles.foodListContainer
        }`}
      >
        {foodList.map((item) => {
          if (category === "All" || category === item.category) {
            return <FoodMenuItem key={item._id} item={item} />;
          }
        })}
      </div>
    </div>
  );
}

export default FoodMenu;
