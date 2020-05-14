interface User {
  id: string;
  image: string;
  name: string;
  placeCount: number;
}

interface Place {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  location: {
    lat: number;
    lng: number;
  };
}
