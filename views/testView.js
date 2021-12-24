import styles from "../styles/TestView.module.css";
import { personalIcons } from "../views/personalIcons";
import Image from "next/image";

export default function TestView(props) {
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}></div>
      <div className={styles.title}>Today is {props.today.toLocaleDateString("en-US", {day: "2-digit",month: "short",})}</div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Due date</td>
            <td>Name</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {[...props.tasks].map((task) => {
            return (
              <tr className={styles.tableRow} key={task.id}>
                <td>{task.date.toLocaleDateString("en-US", {day: "2-digit",month: "short",})}</td>
                <td>{task.person}</td>
                <td>{task.done?"Done":"Not done"}</td>
                <td>{task.stars}</td>
                <td><button onClick={()=>props.toggleTaskState(task.id)}>Mark</button></td>
                <td><button onClick={()=>props.increaseStars(task.id)}>Star</button></td>
                {/* 
                <td>
                  <i
                    className={personalIcons[task.person]}
                    onClick={() => props.toggleTaskState(task.id)}
                  ></i>
                </td>
                */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
