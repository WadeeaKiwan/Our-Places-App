import React from "react";
import "./UserItem.css";

interface UserItemProps {
  id: string;
  image: string;
  name: string;
  placeCount: number;
}

const UserItem = ({ id, image, name, placeCount }: UserItemProps): JSX.Element => {
  return <div></div>;
};

export default UserItem;
