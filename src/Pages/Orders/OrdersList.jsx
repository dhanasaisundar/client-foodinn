/* eslint-disable react/prop-types */
import styles from "./Orders.module.css";
import EmptyOrder from "../../Components/EmptyOrder/EmptyOrder";

function OrdersList({ ordersInfo }) {
  const userInfo = localStorage.getItem("userInfo");
  return ordersInfo.totalOrders?.length === 0 || !userInfo ? (
    <EmptyOrder />
  ) : (
    <div className={styles.ordersContainer}>
      <h1>Past Orders</h1>
      <div>
        {ordersInfo.orderDetails?.map((order) => (
          <div key={order.items.orderId} className={styles.order}>
            <h2>Order Id: {order.items.orderId}</h2>
            <p className={styles.totalPaid}>
              Total Paid: &#8377;{order.items.totalPaid}
            </p>
            <p className={styles.paymentInfo}>
              Total Quantity: {order.items.totalQuantity}
            </p>
            <div className={styles.orderInfo}>
              {ordersInfo.totalOrders?.map((orderEl) =>
                orderEl.map((orderItem) => {
                  return (
                    orderItem.orderId === order.items.orderId && (
                      <div key={orderItem.itemId} className={styles.orderItem}>
                        <img src={orderItem.image} alt={orderItem.name} />
                        <p>{orderItem.name}</p>
                        <p>X</p>
                        <p>{orderItem.quantity}</p>
                      </div>
                    )
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersList;
