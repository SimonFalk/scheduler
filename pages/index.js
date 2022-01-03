import styles from "../styles/Home.module.css";
import useModelProperty from "../js/useModelProperty";
import HeaderView from "../views/headerView";
import IdPresenter from "../presenters/idPresenter";
import TestPresenter from "../presenters/testPresenter";
import ScorePresenter from "../presenters/scorePresenter";
function Home(props) {
  const duties = useModelProperty(props.model, "duties");
  const user = useModelProperty(props.model, "user");
  return (
    <div className={styles.home}>
      <div className={styles.headerBox}>
        <HeaderView />
      </div>
      <div className={styles.idBox}>
        <IdPresenter model={props.model} auth={props.auth} />
      </div>
      {props.model.user != null ? (
        <div>
          <div className={styles.tableBox}>
            <TestPresenter model={props.model} view={"all"} />
          </div>
          <div className={styles.summaryBox}>
            <ScorePresenter model={props.model} />
          </div>
        </div>
      ) : (
        <div className={styles.summaryBox}>
          <h4>How to use</h4>
          <ul>
            <li>Sign in with your account.</li>
            <li>In the schedule you see which weeks you have cleaning duty.</li>
            <li>You can check your task from the due date and 3 days after.</li>
            <li>
              You can give another person a star (only one) anytime during the
              week and 3 days after.
            </li>
            <li>
              A checked task gives 2 points and a star from a friend gives one
              point.
            </li>
            <li>
              The person with most points in the end will be greatly rewarded...
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
