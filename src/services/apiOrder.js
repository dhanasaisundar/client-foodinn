async function apiOrder(cart, totalCartPrice, totalPaid, totalQuantity) {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const apiUrl = "https://apis-foodin-1.onrender.com/api/post/user-orders";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify({
        cart,
        userId: userInfo.userId,
        totalCartPrice,
        totalPaid,
        totalQuantity,
      }),
    };
    const orderResponse = await fetch(apiUrl, options);
    return orderResponse;
  } catch (error) {
    return error.message;
  }
}
//#######################################################################
async function apiFetchOrders() {
  const jwtToken = localStorage.getItem("jwtToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.userId;
  const APIURL = `https://apis-foodin-1.onrender.com/api/get/user-orders/${userId}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwtToken}`,
    },
  };
  const response = await fetch(APIURL, options);
  const data = await response.json();
  return data;
}
//#######################################################################
export { apiOrder, apiFetchOrders };
