import styles from "../styles/IdView.module.css";

export default function IdView(props) {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div>
          <label htmlFor="name-select">I am: </label>
          <select id="name-select">
            <option selected>(Choose)</option>
            <option>Hannes</option>
            <option>Lena</option>
            <option>Ellen</option>
          </select>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            type="password"
            className={styles.passwordInput}
          ></input>
        </div>
        <input name="submit" type="submit" value="Go!"></input>
      </form>
    </div>
  );
}
