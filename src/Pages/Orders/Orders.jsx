import { apiFetchOrders } from "../../services/apiOrder";
import Loader2 from "../../Components/Loader2/Loader2";
import OrdersList from "./OrdersList";
import styles from "./Orders.module.css";
import useFetchData from "../../hooks/useFetchData";

function Orders() {
  const [data, isLoading] = useFetchData(apiFetchOrders);

  return (
    <div className={styles.ordersPage}>
      {isLoading ? <Loader2 /> : <OrdersList ordersInfo={data} />}
    </div>
  );
}

export default Orders;
