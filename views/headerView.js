import styles from "../styles/HeaderView.module.css";

export default function HeaderView(props) {
  return (
    <div className={styles.container}>
      <div className={styles.caption}>
        <span>Kollektivet's cleaning schedule</span>
      </div>
    </div>
  );
}
