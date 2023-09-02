import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import StarRating from "../elements/StarRating";

const DetailPage = () => {
  const { restaurantsId } = useParams();
  const [restaurantData, setRestaurantData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchRestaurantData = async () => {
      const options = {
        method: "GET",
        url: "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/getRestaurantDetails",
        params: {
          restaurantsId: restaurantsId,
          currencyCode: "USD",
        },
        headers: {
          "X-RapidAPI-Key":
            "4ac9a1740bmshb67a6f9c1dcf998p194cd7jsn7260eb361863",
          "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setRestaurantData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchRestaurantData();
  }, [restaurantsId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  const openGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${restaurantData.location.latitude},${restaurantData.location.longitude}`;
    window.open(googleMapsUrl, "_blank");
  };
  return (
    <div>
      <div className="text-center mt-5">
        <h1 className="text-2xl font-extrabold text-blue-950">
          {restaurantData.location.name}
        </h1>
        <h1 className="text-lg font-medium text-gray-600">
          {restaurantData.overview.geo}
        </h1>
      </div>
      <div className="px-10 my-5">
        <p>
          <span className="text-blue-900 font-extrabold">
            <a href="/">Home </a>
          </span>
          {"  "}/{restaurantData.location.name}
        </p>
        <div className="w-full h-80 justify-center flex rounded-3xl">
          <img
            src={restaurantData.location.photo.images.large.url}
            alt=""
            className="w-1/2 object-cover rounded-3xl"
          />
        </div>
        <div className="flex flex-row gap-2">
          <StarRating rating={restaurantData.location.rating} />
          <p>({restaurantData.location.rating})</p>
        </div>
        <div className="mt-5">
          <p className="text-blue-950 font-extrabold">About The Place</p>
          <p className="text-base font-medium text-gray-600">
            {restaurantData.location.description
              ? restaurantData.location.description
              : "Lorem ipsum dolor sit amet, consectetur adip"}
          </p>
        </div>
        <div className="flex flex-row gap-3 mt-5">
          <p className="text-blue-950 font-extrabold">Address : </p>
          <p className="text-base font-medium text-gray-600">
            {restaurantData.location.address}
          </p>
        </div>
        <div className="h-full w-64 flex items-end">
          <button
            onClick={openGoogleMaps}
            className="bg-blue-950 w-full text-white text-xs py-3"
          >
            LIHAT DI MAPS
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
