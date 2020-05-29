import React, { useContext } from "react";
import "./PlaceList.css";
import { useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import PlaceItem from "./PlaceItem";

import { AuthContext } from "../../shared/context/auth-context";

type Props = Readonly<{
  places: Place[];
  onDeletePlace: (deletedPlaceId: string) => void;
}>;

const PlaceList: React.FC<Props> = ({ places, onDeletePlace }) => {
  const auth = useContext(AuthContext);
  const { userId } = useParams();

  if (places.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>
            {auth.userId === userId ? "No places found. Maybe create one?" : "No places found."}
          </h2>
          {auth.userId === userId && <Button to='/places/new'>Share Place</Button>}
        </Card>
      </div>
    );
  }

  return (
    <ul className='place-list'>
      {places.map((place) => (
        <PlaceItem key={place.id} place={place} onDelete={onDeletePlace} />
      ))}
    </ul>
  );
};

export default PlaceList;
