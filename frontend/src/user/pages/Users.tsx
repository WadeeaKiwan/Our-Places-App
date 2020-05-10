import React from "react";

import UsersList from "../components/UsersList";

import { User } from "../../types";

const Users = (): JSX.Element => {
  const USERS: User[] = [
    {
      id: "u1",
      name: "Wadeea Kiwan",
      image:
        "https://firebasestorage.googleapis.com/v0/b/socialape-ad195.appspot.com/o/995518179.jpg?alt=media",
      places: 3
    }
  ];

  return <UsersList users={USERS} />;
};

export default Users;
