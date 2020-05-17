import React from "react";

import UsersList from "../components/UsersList";

const DUMMY_USERS: User[] = [
  {
    id: "u1",
    name: "Wadeea Kiwan",
    image:
      "https://firebasestorage.googleapis.com/v0/b/socialape-ad195.appspot.com/o/995518179.jpg?alt=media",
    placeCount: 2
  },
  {
    id: "u2",
    name: "Max Bla",
    image:
      "https://firebasestorage.googleapis.com/v0/b/socialape-ad195.appspot.com/o/480532018.jpg?alt=media",
    placeCount: 1
  }
];

const Users: React.FC = () => {
  return <UsersList users={DUMMY_USERS} />;
};

export default Users;
