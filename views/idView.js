import styles from "../styles/IdView.module.css";

export default function IdView(props) {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div>
          <label htmlFor="name-select">I am: </label>
          <select id="name-select">
            <option defaultValue>(Choose)</option>
            {[props.persons].map((person) => {
              <option>{person.name}</option>;
            })}
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
