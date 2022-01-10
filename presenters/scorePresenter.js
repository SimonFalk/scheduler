import ScoreView from "../views/scoreView";
import useModelProperty from "../js/useModelProperty";
import React from "react";
export default function ScorePresenter(props) {
  const stars = useModelProperty(props.model, "stars");
  const user = useModelProperty(props.model, "user");
  return (
    <ScoreView
      persons={props.model.persons}
      stars={stars}
      hidden={user ? false : true}
    />
  );
}
