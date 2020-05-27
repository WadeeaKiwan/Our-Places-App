import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

type ParamTypes = Readonly<{
  userId: string;
}>;

const UserPlaces: React.FC = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const { userId } = useParams<ParamTypes>();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);

        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner isOverlay />}
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList places={loadedPlaces} />}
    </React.Fragment>
  );
};

export default UserPlaces;
