import styles from "../styles/Home.module.css";
import TestPresenter from "../presenters/testPresenter";

function Test(props) {
  return (
    <div className="container">
      <TestPresenter model={props.model} forDuty={"Kitchen/recycling"} />
    </div>
  );
}

export default Test;
