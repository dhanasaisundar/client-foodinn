async function apiAddToCart(cartId, item) {
  const apiUrl = "https://apis-foodin-1.onrender.com/api/cart/add";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
    body: JSON.stringify({ cartId, item }),
  };
  try {
    const cartUpdateResponse = await fetch(apiUrl, options);
    return cartUpdateResponse;
  } catch (error) {
    return error.message;
  }
}
//########################################################################
async function apiDeleteFromCart(cartId, item) {
  const apiUrl = "https://apis-foodin-1.onrender.com/api/cart/delete";
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
    body: JSON.stringify({ cartId, item }),
  };
  try {
    const cartUpdateResponse = await fetch(apiUrl, options);
    return cartUpdateResponse;
  } catch (error) {
    return error.message;
  }
}
//########################################################################
async function apiIncreaseQuantity(cartId, itemId) {
  const apiUrl = "https://apis-foodin-1.onrender.com/api/cart/increase";
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
    body: JSON.stringify({ cartId, itemId }),
  };
  try {
    const cartUpdateResponse = await fetch(apiUrl, options);
    return cartUpdateResponse;
  } catch (error) {
    return error.message;
  }
}
//########################################################################
async function apiDecreaseQuantity(cartId, itemId) {
  const apiUrl = "https://apis-foodin-1.onrender.com/api/cart/decrease";
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
    body: JSON.stringify({ cartId, itemId }),
  };
  try {
    const cartUpdateResponse = await fetch(apiUrl, options);
    return cartUpdateResponse;
  } catch (error) {
    return error.message;
  }
}
//########################################################################
async function apiClearCart(cartId) {
  const apiUrl = "https://apis-foodin-1.onrender.com/api/cart/clear";
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
    body: JSON.stringify({ cartId }),
  };
  try {
    const cartUpdateResponse = await fetch(apiUrl, options);
    return cartUpdateResponse;
  } catch (error) {
    return error.message;
  }
}
//########################################################################
export {
  apiAddToCart,
  apiDeleteFromCart,
  apiIncreaseQuantity,
  apiDecreaseQuantity,
  apiClearCart,
};
