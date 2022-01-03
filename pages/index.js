import { useRouter } from "next/router";
import React from "react";
import useModelProperty from "../js/useModelProperty";
function Home(props) {
  const router = useRouter();
  const tasks = useModelProperty(props.model, "tasks");
  React.useEffect(() => {
    console.log("Tasks object has changed to", tasks);
  }, [tasks]);
  return (
    <div>
      <button
        onClick={() => {
          router.push("/signin");
        }}
      >
        Sign in
      </button>
      <button
        onClick={() => {
          props.auth.signOut();
        }}
      >
        Sign out
      </button>
      <div>
        <h3>Tasks</h3>
        <ul>
          {tasks?.map((task) => (
            <li>{new Date(task.date).toDateString()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
