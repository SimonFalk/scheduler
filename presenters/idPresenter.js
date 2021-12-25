import IdView from "../views/idView";
import { useRouter } from "next/router";
import React from "react";
import useModelProperty from "../js/useModelProperty";
import signOut from "firebase/auth";

export default function IdPresenter(props) {
  const user = useModelProperty(props.model, "user");
  const router = useRouter();

  return (
    <IdView
      user={user}
      signOutUser={() => props.auth.signOut()}
      signInUser={() => {
        router.push("/test");
      }}
    />
  );
}
