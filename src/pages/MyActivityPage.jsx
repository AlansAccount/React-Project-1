// =======================================
// frontend/src/pages/MyActivityPage.jsx
// =======================================
import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export default function MyActivityPage() {
  const { activities } = useContext(ActivityContext);

  return (
    <div>
      <h2>My Activity</h2>
      {activities.map((act) => (
        <div key={act.activityId}>
          <p>
            [{act.timestamp}] {act.type} on post {act.postId}
          </p>
        </div>
      ))}
    </div>
  );
}
