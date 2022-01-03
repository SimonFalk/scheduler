import styles from "../styles/IdView.module.css";
import { personalIcons } from "../views/personalIcons";

export default function IdView(props) {
  return (
    <div className={styles.container}>
      {props.user ? (
        props.error || (
          <>
            <div className={styles.content}>
              <div className={styles.card}>
                <div className={styles.cardIcon}>
                  <i className={personalIcons[props.user.name]}></i>
                </div>
                <div className={styles.details}>
                  <div>
                    <span className={styles.field}>Name: </span>
                    {props.user.name}
                  </div>
                  <div>
                    <span className={styles.field}>Room: </span>{" "}
                    {props.user.room}
                  </div>
                  <div>
                    <span className={styles.field}>Email: </span>
                    {props.user.email}
                  </div>
                </div>
              </div>
              <div className={styles.signOutButton} onClick={props.signOutUser}>
                <i class="fas fa-sign-out-alt"></i>
              </div>
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
