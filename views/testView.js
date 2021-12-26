import styles from "../styles/TestView.module.css";
import React from "react";
import { personalIcons } from "../views/personalIcons";
import Image from "next/image";

export default function TestView(props) {
  const scrollBox = React.useRef(null);
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}></div>
      <div className={styles.title}>
        <div>
          Today is{" "}
          {props.today.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
          })}
        </div>
        <div>{props.error}</div>
      </div>
      <div className={styles.schedule}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Due date</th>
              <th>Name</th>
              <th>Stars</th>
            </tr>
          </thead>
          <tbody>
            {[...props.tasks].map((task) => {
              return (
                <tr
                  className={
                    styles.tableRow +
                    (task.done ? " " + styles.selectedRow : "")
                  }
                  key={task.id}
                >
                  <td>
                    {task.date.toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </td>
                  <td>
                    {task.person} <i className={personalIcons[task.person]}></i>
                  </td>
                  <td>
                    {task.done ? (
                      <span>
                        <button onClick={() => props.increaseStars(task)}>
                          Star
                        </button>
                        ({task.stars} stars)
                        {/*
                        {Array(task.stars)
                          .fill(0)
                          .map((_, i) => {
                            <i
                              key={"fillStar_" + i}
                              className="fas fa-star"
                            ></i>;
                          })}
                        {Array(5 - task.stars)
                          .fill(0)
                          .map((_, i) => {
                            <i
                              key={"blankStar_" + i}
                              className="far fa-star"
                            ></i>;
                          })}
                          */}
                      </span>
                    ) : (
                      props.isMarkable(task) && (
                        <button onClick={() => props.setTaskDone(task)}>
                          Mark
                        </button>
                      )
                    )}
                  </td>
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
    </div>
  );
}
