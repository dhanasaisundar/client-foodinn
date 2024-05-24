/* eslint-disable react/prop-types */
import { useState } from "react";
import { menuList } from "../../assets/assets.js";
import ExploreMenuItem from "./ExploreMenuItem";
import FoodMenu from "../FoodMenu/FoodMenu.jsx";
import HrLine from "../HrLine/HrLine.jsx";
import styles from "./ExploreMenu.module.css";

function ExploreMenu() {
  const [category, setCategory] = useState("All");
  function handleCategoryBtn(clickedCategory) {
    setCategory((prevCategory) =>
      clickedCategory === prevCategory ? "All" : clickedCategory
    );
  }
  return (
    <div className={styles.menuContainer}>
      <h1>What&apos;s on your Mind?</h1>
      <ul className={styles.exploreMenuContainer}>
        {menuList.map((item, index) => {
          return (
            <ExploreMenuItem
              key={index}
              itemImage={item.menu_image}
              itemName={item.menu_name}
              category={category}
              handleCategoryBtn={handleCategoryBtn}
            />
          );
        })}
      </ul>
      <HrLine />
      <FoodMenu category={category} />
    </div>
  );
}

export default ExploreMenu;
