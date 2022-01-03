import TestView from "../views/testView";
import React from "react";
import useModelProperty from "../js/useModelProperty";

const dayMilliSeconds = 24 * 3600 * 1000;

export default function TestPresenter(props) {
  const [error, setError] = React.useState("");
  const [view, setView] = React.useState(props.view);
  const tasks = useModelProperty(props.model, "tasks");
  const today = useModelProperty(props.model, "today");
  const user = useModelProperty(props.model, "user");

  return (
    <TestView
      today={today}
      persons={props.model.persons}
      user={user}
      changeView={setView}
      view={view}
      tasks={tasks}
      error={error}
      setTaskDone={(task) => {
        props.model.setTaskState(task.id, true);
      }}
      increaseStars={(task) => {
        props.model.starTask(task.person, task.id, 1);
      }}
      decreaseStars={(task) => {
        props.model.starTask(task.person, task.id, -1);
      }}
    />
  );
}
