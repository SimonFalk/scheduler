import styles from "../styles/IdView.module.css";
import { personalIcons } from "../views/personalIcons";

export default function IdView(props) {
  return (
    <div className={styles.container}>
      {props.user ? (
        props.error || (
          <>
            <div>
              <div className={styles.card}>
                <div className={styles.cardIcon}>
                  <i className={personalIcons[props.user.name]}></i>
                </div>
                <div>{props.user.name}</div>
                <div>{props.user.email}</div>
              </div>
              <button onClick={props.signOutUser}>Sign out</button>
            </div>
          </>
        )
      ) : (
        <>
          <button onClick={props.signInUser}>Sign in</button>
        </>
      )}
    </div>
  );
}
