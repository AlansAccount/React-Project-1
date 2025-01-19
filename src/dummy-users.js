// dummy-users.js or context file
export let DUMMY_USERS = [];

const saved = localStorage.getItem("dummyUsers");

if (saved) {
    DUMMY_USERS = JSON.parse(saved);
  }