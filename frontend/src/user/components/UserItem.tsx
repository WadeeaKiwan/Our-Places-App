import React from "react";
import PropTypes from "prop-types";
import "./UserItem.css";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

interface Props {
  id: string;
  image: string;
  name: string;
  placeCount: number;
}

const UserItem: React.FC<Props> = ({ id, image, name, placeCount }) => {
  return (
    <li className='user-item'>
      <Card className='user-item__content'>
        <Link to={`/${id}/places`}>
          <div className='user-item__image'>
            <Avatar image={image} alt={name} />
          </div>
          <div className='user-item__info'>
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

UserItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeCount: PropTypes.number.isRequired
};

export default UserItem;
