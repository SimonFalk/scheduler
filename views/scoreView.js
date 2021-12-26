import styles from "../styles/ScoreView.module.css";
import { personalIcons } from "../views/personalIcons";

export default function ScoreView(props) {
  return (
    <div className={styles.container}>
      {[...props.persons].map((person) => (
        <div>
          <i className={personalIcons[person.name]}></i>:
          {props.stars[person.name]}
        </div>
      ))}
    </div>
  );
}
