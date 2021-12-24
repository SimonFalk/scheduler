import TestView from "../views/testView";
import useModelProperty from "../js/useModelProperty";
export default function TestPresenter(props) {
  const tasks = useModelProperty(props.model, "tasks");
  const today = useModelProperty(props.model, "today");
  return (
    <TestView
      today={props.model.today}
      forDuty={props.forDuty}
      tasks={[...tasks].filter((task) => task.duty === props.forDuty)}
      toggleTaskState={(id) => props.model.toggleTaskState(id)}
      increaseStars={(taskId) => {
        const stars = tasks.filter((obj) => obj.id === taskId)[0].stars + 1;
        props.model.setStarsForTask(taskId, stars);
      }}
    />
  );
}
