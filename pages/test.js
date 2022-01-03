import styles from "../styles/Home.module.css";
import TestPresenter from "../presenters/testPresenter";

function Test(props) {
  return (
    <div className="container">
      <TestPresenter model={props.model} />
    </div>
  );
}

export default Test;
