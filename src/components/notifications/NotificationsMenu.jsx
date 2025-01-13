export default function NotificationsMenu() {
  return (
    <div className="notifications-menu">
      <h2>Notifications</h2>
      <ul>
        <li>
          <a href="/notifications/1">Notification 1</a>
        </li>
        <li>
          <a href="/notifications/2">Notification 2</a>
        </li>
        <li>
          <a href="/notifications/3">Notification 3</a>
        </li>
      </ul>
    </div>
  );
}

// I have to make this so that notifications links are clickabel and that 
// links are dynamic based on props that are passeed in.

// And this is a pop up modal that shows up when user clicks on the button for it.

// This will be a possible context I need to apply to several sidebar elements
// such as messages or post interactions user gets on their posts or comments.

 // So in essense, this will be a pop up modal that will show up 
 // and the modal changes depending which SIDEBAR button is clicked

 //Add a portal to the index.HTML file?