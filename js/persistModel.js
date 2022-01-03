import { auth, database } from "./firebase";
import { set, ref, onValue } from "firebase/database";

export default function persistModel(model) {
  let loadingFromFirebase = false;
  let writingToFirebase = false;
  model.addObserver(function () {
    // save the model into the cloud
    if (loadingFromFirebase) return; // flag that tells observer to NOT save to cloud
    writingToFirebase = true;
    console.log("Writing to firebase");
    set(ref(database, "tasks"), model.tasks);
    set(ref(database, "stars"), model.stars);
    writingToFirebase = false;
  });
  onValue(ref(database), (snapshot) => {
    // load data from cloud into model if there is data
    if (writingToFirebase) return;
    loadingFromFirebase = true; // set the flag so we don't upload the model while downloading it.
    try {
      const data = snapshot.val();
      if (data) {
        console.log("Writing to model");
        model.setTasks(data.tasks || []);
        model.setStars(data.stars || {});
      }
    } catch (e) {
      console.log(e);
    } finally {
      loadingFromFirebase = false; // unset the flag so the app can function as normal.
    }
  });
}
