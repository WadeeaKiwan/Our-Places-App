import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../shared/util/validators";

const DUMMY_PLACES: Place[] = [
  {
    id: "p3",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Empire_State_Building%2C_New_York%2C_NY.jpg",
    title: "Empire State Building",
    description: "One of the most sky scrapers in the world!",
    address: "20 W 34th St, New York, NY 10001, United States",
    creatorId: "u2",
    location: {
      lat: 40.7484405,
      lng: -73.9856644
    }
  }
];

type ParamTypes = Readonly<{
  placeId: string;
}>;

const UpdatePlace = () => {
  const { placeId } = useParams<ParamTypes>();
  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title'
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (min. 5 characters).'
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type='submit' disabled={true}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
