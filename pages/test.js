import styles from "../styles/Home.module.css";
import useModelProperty from "../js/useModelProperty";
import TestPresenter from "../presenters/testPresenter";
function Home(props) {
  const duties = useModelProperty(props.model, "duties");
  return (
    <div className={styles.home}>
      <div className={styles.tableBox}>
        {[...props.model.duties].map((duty) => (
          <TestPresenter forDuty={duty} model={props.model} />
        ))}
      </div>
    </div>
  );
}

export default Home;
