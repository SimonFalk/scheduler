import styles from "../styles/TestView.module.css";

import React from "react";
import { personalIcons } from "../views/personalIcons";
import TodoList from "../views/todoList";
import ReadmeList from "../views/readmeList";

const dayMilliSeconds = 24 * 3600 * 1000;

function ListEntry(props) {
  const postLimitCheck = 3; // The number of days after the deadline when task still can be checked
  const preLimitCheck = 0; // Number of days before the deadline when task can be checked
  const postLimitStar = 3; // The number of days after the deadline when task still can be checked
  const preLimitStar = 7; // Number of days before the deadline when task can be checked

  // Determine if markable
  const [markableError, setMarkableError] = React.useState("");
  React.useEffect(() => {
    if (!props.user) {
      setMarkableError("You are not signed in.");
      return;
    }
    if (props.task.done) {
      setMarkableError("This task has already been marked as done.");
      return;
    }
    if (props.task.person != props.user.name) {
      setMarkableError("You can't mark another person's task.");
      return;
    }
    if (
      props.today.getTime() - props.task.date >
      postLimitCheck * dayMilliSeconds
    ) {
      setMarkableError(
        "Tasks can only be checked within " +
          postLimitCheck +
          " after due date. "
      );
    } else {
      if (
        props.task.date - props.today.getTime() >
        preLimitCheck * dayMilliSeconds
      ) {
        setMarkableError(
          "It's not possible to check this task yet. Please try again after " +
            new Date(
              props.task.date + postLimitCheck * dayMilliSeconds
            ).toLocaleDateString("en-GB")
        );
      } else {
        setMarkableError("");
      }
    }
  }, [props.task, props.user, props.persons, props.today]);

  // Determine if starrable
  const [starrableError, setStarrableError] = React.useState("");
  React.useEffect(() => {
    if (!props.user) {
      setStarrableError(
        "You are not signed in. Please sign in to give away stars."
      );
      return;
    }
    if (props.task.person === props.user.name) {
      setStarrableError("You can't give a star to yourself.");
      return;
    }
    if (
      props.today.getTime() - props.task.date >
      postLimitStar * dayMilliSeconds
    ) {
      setStarrableError(
        "You can only give out stars within " +
          postLimitCheck +
          " after due date. "
      );
      return;
    }
    if (
      props.task.date - props.today.getTime() >
      preLimitStar * dayMilliSeconds
    ) {
      setStarrableError(
        "It's not possible to give this task a star yet. Please try again after " +
          new Date(
            props.task.date + postLimitCheck * dayMilliSeconds
          ).toLocaleDateString("en-GB")
      );
      return;
    }
    setStarrableError("");
  }, [props.task, props.user, props.persons, props.today]);
  return (
    <tr
      className={
        styles.tableRow + (props.task.done ? " " + styles.selectedRow : "")
      }
      key={props.task.id}
    >
      <td className={styles.dateColumn}>
        {new Date(props.task.date).toDateString().slice(4, -5)}
      </td>
      <td className={styles.nameColumn}>
        {props.task.person} <i className={personalIcons[props.task.person]}></i>
      </td>
      <td className={styles.actionColumn}>
        {props.task.person != props.user?.name ? (
          !props.task.hasStarred[props.user?.name] ? (
            <button
              onClick={() => {
                if (starrableError) {
                  props.viewError(starrableError);
                } else {
                  props.increaseStars(props.task);
                }
              }}
              className={starrableError ? styles.disabled : ""}
            >
              Star
            </button>
          ) : (
            <button
              onClick={() => {
                if (starrableError) {
                  props.viewError(starrableError);
                } else {
                  props.decreaseStars(props.task);
                }
              }}
              className={starrableError ? styles.disabled : ""}
            >
              Unstar
            </button>
          )
        ) : (
          <button
            onClick={() => {
              if (markableError) {
                props.viewError(markableError);
              } else {
                props.setTaskDone(props.task);
              }
            }}
            className={markableError ? styles.disabled : ""}
          >
            Check
          </button>
        )}
      </td>
      <td className={styles.actionColumn}>
        {Array(props.task.stars)
          .fill(0)
          .map((_, i) => (
            <i key={"fillStar_" + i} className="fas fa-star"></i>
          ))}
        {Array(5 - props.task.stars)
          .fill(0)
          .map((_, i) => (
            <i key={"blankStar_" + i} className="far fa-star"></i>
          ))}
      </td>
    </tr>
  );
}

function ScheduleList(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Due date</th>
          <th>Name</th>
          <th>Action</th>
          <th>Stars</th>
        </tr>
      </thead>
      <tbody>
        {props.tasks?.map((task) => {
          return (
            <ListEntry
              task={task}
              key={task.id}
              user={props.user}
              persons={props.persons}
              today={props.today}
              setTaskDone={props.setTaskDone}
              increaseStars={props.increaseStars}
              decreaseStars={props.decreaseStars}
              viewError={props.setError}
            />
          );
        })}
      </tbody>
    </table>
  );
}

export default function TestView(props) {
  const [error, setError] = React.useState("");
  const scrollBox = React.useRef(null); //TODO: Auto-scroll to current date
  const disableMyWeeks = true;
  const ENUM_STATES = {
    all: <ScheduleList {...props} setError={setError} />,
    todo: <TodoList />,
    readme: <ReadmeList />,
  };
  return (
    <div className={styles.container}>
      {props.user ? (
        <div className={styles.menu}>
          <div className={styles.menuOptions}>
            {props.view != "all" ? (
              <div
                onClick={() => {
                  props.changeView("all");
                }}
              >
                Show all weeks
              </div>
            ) : (
              <></>
            )}
            {!disableMyWeeks && props.user && props.view != "my" ? (
              <div
                onClick={() => {
                  props.changeView("my");
                }}
              >
                Show my weeks
              </div>
            ) : (
              <></>
            )}
            {props.view != "todo" ? (
              <div
                onClick={() => {
                  props.changeView("todo");
                }}
              >
                Show to do-list
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <div className={styles.title}>
        <div>
          Today is{" "}
          {props.today.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
        <div>{error}</div>
      </div>
      <div className={styles.schedule}>{ENUM_STATES[props.view]}</div>
    </div>
  );
}
