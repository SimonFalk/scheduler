import styles from "../styles/TestView.module.css";
import Image from "next/image";

export default function TestView(props) {
  const personalIcons = {
    Lena: "fas fa-landmark",
    Ellen: "fas fa-diagnoses",
    Melker: "fas fa-industry",
    Simon: "fas fa-calculator",
    Hannes: "fas fa-music",
    Ines: "fas fa-robot",
  };
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
                <td>{task.month}</td>
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
