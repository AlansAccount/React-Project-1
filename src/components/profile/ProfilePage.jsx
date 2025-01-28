/**
 * frontend/src/pages/ProfilePage.jsx
 *
 * Shows only the current user's posts by passing "userId" to <Feed>.
 */
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Feed from "../components/feed/Feed";

export default function ProfilePage() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <p>Please log in to see your profile.</p>;
  }

  return (
    <div>
      <h2>{currentUser.name}'s Profile</h2>
      {/* Show only that user's posts */}
      <Feed userId={currentUser.id} />
    </div>
  );
}
