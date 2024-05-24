import { useState } from "react";
import { userInfoUpdate } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import styles from "./Account.module.css";
import toast from "react-hot-toast";
function Account() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [name, setName] = useState(userInfo.username || "");
  const [email, setEmail] = useState(userInfo.email || "");
  const [address1, setAddress1] = useState(userInfo.address1 || "");
  const [address2, setAddress2] = useState(userInfo.address2 || "");
  const [city, setCity] = useState(userInfo.city || "");
  const [state, setState] = useState(userInfo.state || "");
  const [pincode, setPincode] = useState(userInfo.pincode || "");
  const [country, setCountry] = useState(userInfo.country || "");
  const [phone, setPhone] = useState(userInfo.phoneNumber || "");
  const navigate = useNavigate();

  async function handleSaveChanges(e) {
    e.preventDefault();
    const updatedUserInfo = {
      userId: userInfo?.userId,
      username: name,
      email: email,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      pincode: pincode,
      country: country,
      phoneNumber: phone,
    };
    localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    try {
      const userInfoResponse = await userInfoUpdate(updatedUserInfo);
      const data = await userInfoResponse.json();
      if (userInfoResponse.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleLogout() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("cartId");
    localStorage.removeItem("cart");
    navigate("/");
    window.location.reload();
  }

  return (
    <div className={styles.accountFormContainer}>
      <h1>Your Account</h1>
      <form
        className={styles.accountFormContainer__form}
        onSubmit={handleSaveChanges}
      >
        <div className={styles.inputContainer}>
          <label htmlFor="username">Name:</label>
          <input
            id="username"
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="address">Address Line 1:</label>
          <input
            id="address"
            type="text"
            defaultValue={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="address">Address Line 2:</label>
          <input
            id="address"
            type="text"
            defaultValue={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>
        <div className={styles.cityState}>
          <div>
            <label htmlFor="address">City:</label>
            <input
              id="address"
              type="text"
              defaultValue={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">State:</label>
            <input
              id="address"
              type="text"
              defaultValue={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.cityState}>
          <div>
            <label htmlFor="address">Pincode:</label>
            <input
              id="address"
              type="text"
              defaultValue={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">Country:</label>
            <input
              id="address"
              type="text"
              defaultValue={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="phoneNo">Phone No:</label>
          <input
            id="phoneNo"
            type="tel"
            defaultValue={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button type="submit">Save Changes</Button>
          <Button type="button" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Account;
