import styles from "../styles/IdView.module.css";

export default function IdView(props) {
  return (
    <div className={styles.container}>
      {props.user ? (
        <>
          <div>Currently logged in as: {props.user}</div>
          <button onClick={props.signOutUser}>Sign out</button>
        </>
      ) : (
        <>
          <div>No user logged in</div>
          <button onClick={props.signInUser}>Sign in</button>
        </>
      )}
    </div>
  );
}
