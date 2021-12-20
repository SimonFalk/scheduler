import IdView from "../views/idView";
export default function IdPresenter(props) {
  return <IdView persons={props.model.persons} />;
}
