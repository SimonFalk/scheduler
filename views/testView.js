import styles from "../styles/TestView.module.css";

export default function TestView(props) {
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}></div>
      <div className={styles.title}>Kitchen</div>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>5/1</td>
            <td>Simon</td>
            <td>
              <button>x</button>
            </td>
          </tr>
          <tr>
            <td>12/1</td>
            <td>Melker</td>
            <td>
              <button>x</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
