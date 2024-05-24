import styles from "./Banner.module.css";

function Banner() {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerHeadCon}>
        <div>For better experience, download the Mobile app now</div>
      </div>

      <div className={styles.storeLinks}>
        <a
          className={styles.store}
          href="https://play.google.com/store/apps/details?id=in.swiggy.android&referrer=utm_source%3Dswiggy%26utm_medium%3Dheader"
        >
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
            alt="Google play"
          />
        </a>
        <a
          className={styles.store}
          href="https://apps.apple.com/in/app/swiggy-food-grocery-dineout/id989540920?referrer=utm_source%3Dswiggy%26utm_medium%3Dhomepage"
        >
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"
            alt="Apple play"
          />
        </a>
      </div>
    </div>
  );
}

export default Banner;
