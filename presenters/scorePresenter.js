import ScoreView from "../views/scoreView";
export default function ScorePresenter(props) {
  return <ScoreView persons={props.model.persons} />;
}
