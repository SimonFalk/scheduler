import TestView from "../views/testView";
import React from "react";
import useModelProperty from "../js/useModelProperty";

const dayMilliSeconds = 24 * 3600 * 1000;

export default function TestPresenter(props) {
  const [error, setError] = React.useState("");
  const tasks = useModelProperty(props.model, "tasks");
  const today = useModelProperty(props.model, "today");
  // Time limits
  const postLimit = 3; // The number of days after the deadline when task still can be checked
  const preLimit = 0; // Number of days before the deadline when task can be checked

  React.useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <TestView
      today={today}
      tasks={tasks}
      error={error}
      isMarkable={(task) => {
        if (today.getTime() - task.date > postLimit * dayMilliSeconds) {
          return false;
        } else {
          if (task.date - today.getTime() > preLimit * dayMilliSeconds) {
            return false;
          } else {
            return true;
          }
        }
      }}
      setTaskDone={(task) => {
        //Check if already done
        if (task.done) {
          setError("This task has already been marked as done.");
          return;
        }
        if (!props.model.user) {
          setError("You are not signed in. Please sign in to give away stars.");
          return;
        }
        if (
          props.model.persons.filter((obj) => obj.email === props.model.user)[0]
            .name != task.person
        ) {
          setError("You can't mark another person's task.");
          return;
        }
        //Check if within time limits
        if (today.getTime() - task.date > postLimit * dayMilliSeconds) {
          setError(
            "Too many days (more than " +
              postLimit +
              ") have passed since due date. "
          );
        } else {
          if (task.date - today.getTime() > preLimit * dayMilliSeconds) {
            setError(
              "This task is not due yet. Please try again after " +
                task.date.toLocaleDateString("en-GB")
            );
          } else {
            props.model.setTaskState(task.id, true);
          }
        }
      }}
      increaseStars={(task) => {
        // TODO: Change this to general user
        if (!props.model.user) {
          setError("You are not signed in. Please sign in to give away stars.");
          return;
        }
        if (
          props.model.persons.filter((obj) => obj.email === props.model.user)[0]
            .name === task.person
        ) {
          setError("You can't give a star to yourself.");
          return;
        }
        if (!task.done)
          setError("Wait until this task is marked as done to give stars.");

        if (task.hasStarred.includes(props.model.user)) {
          setError(
            "You have already given " + task.person + " a star for this task."
          );
        } else {
          props.model.starTask(task.person, task.id);
        }
      }}
    />
  );
}
