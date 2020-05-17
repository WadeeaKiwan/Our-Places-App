import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES: Place[] = [
  {
    id: "p1",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialape-ad195.appspot.com/o/matthias-schroder-KoBCaTPydqs-unsplash.jpg?alt=media",
    title: "Strada Statale Porrettana",
    description: "Strada Statale Porrettana",
    address: "Strada Statale Porrettana, 240, 40135 Bologna BO, Italy, Bologna",
    creatorId: "u1",
    location: {
      lat: 44.4896115,
      lng: 11.3129859
    }
  },
  {
    id: "p2",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/socialape-ad195.appspot.com/o/filip-mroz-VH7NuUbj104-unsplash.jpg?alt=media",
    title: "One Queen Street East",
    description: "One Queen Street East",
    address: "One Queen Street East, Toronto, Canada",
    creatorId: "u1",
    location: {
      lat: 43.6672424,
      lng: -79.395718
    }
  },
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
  userId: string;
}>;

const UserPlaces: React.FC = () => {
  const { userId } = useParams<ParamTypes>();
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creatorId === userId);

  return (
    <React.Fragment>
      <PlaceList places={loadedPlaces} />
    </React.Fragment>
  );
};

export default UserPlaces;
