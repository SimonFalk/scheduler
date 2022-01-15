import IdView from "../views/idView";
import { useRouter } from "next/router";
import React from "react";
import useModelProperty from "../js/useModelProperty";

export default function IdPresenter(props) {
  const user = useModelProperty(props.model, "user");
  const userError = useModelProperty(props.model, "userError");
  const router = useRouter();

  return (
    <IdView
      persons={props.model.persons}
      user={user}
      error={userError}
      signOutUser={() => props.auth.signOut()}
      signInUser={() => {
        router.push("/signin");
      }}
    />
  );
}
