import React from "react";
import "./PlaceList.css";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import PlaceItem from "./PlaceItem";

type Props = Readonly<{
  places: Place[];
  onDeletePlace: (deletedPlaceId: string) => void;
}>;

const PlaceList: React.FC<Props> = ({ places, onDeletePlace }) => {
  if (places.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to='/places/new'>Share Place</Button>
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
