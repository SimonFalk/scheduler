import styles from "../styles/Home.module.css";
import HeaderView from "../views/headerView";
import IdPresenter from "../presenters/idPresenter";
import TestPresenter from "../presenters/testPresenter";
function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.headerBox}>
        <HeaderView />
      </div>
      <div className={styles.pageBox}>
        <IdPresenter />
        <TestPresenter />
      </div>
    </div>
  );
}

export default Home;
