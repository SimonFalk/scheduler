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
        <div></div>
      )}
    </div>
  );
}

export default Home;
