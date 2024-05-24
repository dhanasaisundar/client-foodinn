import { useState, useEffect } from "react";
import { headerHeroImg } from "../../assets/swiggy/swiggy";
import styles from "./Header.module.css";

function Header() {
  const [randomHeroImgIndex, setRandomHeroImgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setRandomHeroImgIndex(
        (prevIndex) => (prevIndex + 1) % headerHeroImg.length
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerInfo}>
        <h2>Delicious Food Delivered Straight to Your Door.</h2>
        <p>
          Hunger pangs attacking? Don&apos;t sweat the prep work! Order in
          minutes and enjoy a world of culinary options, all from the comfort of
          your couch.
        </p>
        <button>View Menu</button>
      </div>
      <div className={styles.headerImgCon}>
        <img
          src={headerHeroImg[randomHeroImgIndex]}
          alt="Hero Image"
          className={styles.headerImg}
        />
      </div>
    </div>
  );
}

export default Header;
