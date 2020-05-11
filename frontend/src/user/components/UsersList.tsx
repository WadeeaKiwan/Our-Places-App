import React from "react";
import PropTypes from "prop-types";
import "./UsersList.css";

import UserItem from "./UserItem";

type Props = Readonly<{
  users: User[];
}>;

const UsersList: React.FC<Props> = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className='center'>
        <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <ul className='users-list'>
      {users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.placeCount}
        />
      ))}
    </ul>
  );
};

UsersList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UsersList;
