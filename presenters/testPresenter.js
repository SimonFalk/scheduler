import TestView from "../views/testView";
import useModelProperty from "../js/useModelProperty";
export default function TestPresenter(props) {
  const tasks = useModelProperty(props.model, "tasks");
  return (
    <TestView
      forDuty={props.forDuty}
      tasks={[...tasks].filter((task) => task.duty === props.forDuty)}
      toggleTaskState={(id) => props.model.toggleTaskState(id)}
    />
  );
}
