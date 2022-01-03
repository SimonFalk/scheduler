import styles from "../styles/ScoreView.module.css";
import { personalIcons } from "../views/personalIcons";

export default function ScoreView(props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Scoreboard</div>
      <div className={styles.board}>
        {[...props.persons].map((person) => (
          <div>
            <i className={personalIcons[person.name]}></i>{" "}
            {props.stars[person.name]}
          </div>
        ))}
      </div>
    </div>
  );
}
