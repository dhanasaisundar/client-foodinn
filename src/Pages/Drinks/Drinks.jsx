import DrinksItem from "./DrinksItem";
import styles from "./Drinks.module.css";
import Loader2 from "../../Components/Loader2/Loader2";
import useFetchData from "../../hooks/useFetchData";
import apiGetDrinks from "../../services/apiDrinks";

function Drinks() {
  const [data, isLoading] = useFetchData(apiGetDrinks);
  return (
    <div className={styles.drinksPage}>
      {isLoading ? (
        <Loader2 />
      ) : (
        <>
          <h1 className={styles.drinksTitle}>FoodInn Exclusive Drinks</h1>
          <ul className={styles.drinksContainer}>
            {data.map((drink) => (
              <DrinksItem drink={drink} key={drink.drinkId} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Drinks;
