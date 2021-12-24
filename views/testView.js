import styles from "../styles/TestView.module.css";
import { personalIcons } from "../views/personalIcons";
import Image from "next/image";

export default function TestView(props) {
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}></div>
      <div className={styles.title}>{props.forDuty}</div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Due date</td>
            <td>Name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {[...props.tasks].map((task) => {
            return (
              <tr class={styles.tableRow} key={task.id}>
                <td>{task.date}</td>
                <td>{task.person}</td>
                <td className={task.done ? "icon-color" : "icon-black"}>
                  <i
                    className={personalIcons[task.person]}
                    onClick={() => props.toggleTaskState(task.id)}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
