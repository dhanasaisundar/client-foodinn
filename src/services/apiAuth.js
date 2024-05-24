async function registerUser(username, email, password, confirmPassword) {
  const apiUrl = "https://apis-foodin-1.onrender.com/api/user/register";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password, confirmPassword }),
  };
  try {
    const authResponse = await fetch(apiUrl, options);
    return authResponse;
  } catch (error) {
    return error.message;
  }
}
//#############################################################################

async function userLogin(email, password) {
  const apiUrl = "https://apis-foodin-1.onrender.com/api/user/login";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  try {
    const loginResponse = await fetch(apiUrl, options);
    return loginResponse;
  } catch (error) {
    return error.message;
  }
}
//#############################################################################

async function userInfoUpdate(userInfo) {
  try {
    const jwtToken = localStorage.getItem("jwtToken") || "";
    const apiUrl = "https://apis-foodin-1.onrender.com/api/user/info-update";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(userInfo),
    };
    const userInfoResponse = await fetch(apiUrl, options);
    return userInfoResponse;
  } catch (error) {
    return error.message;
  }
}
//#############################################################################

export { registerUser, userLogin, userInfoUpdate };
