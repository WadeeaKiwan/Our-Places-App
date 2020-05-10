import React from "react";
import "./UsersList.css";

import UserItem from "./UserItem";

import { User } from "../../types";

interface UsersListProps {
  users: User[];
}

const UsersList = ({ users }: UsersListProps): JSX.Element => {
  if (users.length === 0) {
    return (
      <div className='center'>
        <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <ul>
      {users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};

export default UsersList;
