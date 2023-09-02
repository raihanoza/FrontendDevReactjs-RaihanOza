import React, { useEffect, useState } from "react";
import StarRating from "../elements/StarRating";
import axios from "axios";
import { Link } from "react-router-dom";
import FilterOption from "./FilterOption";
const RestaurantList = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [visibleRestaurants, setVisibleRestaurants] = useState(8);
  const [openNowFilter, setOpenNowFilter] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants",
          {
            params: {
              locationId: "294229",
            },
            headers: {
              "X-RapidAPI-Key":
                "4ac9a1740bmshb67a6f9c1dcf998p194cd7jsn7260eb361863",
              "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
            },
          }
        );
        setRestaurantData(response.data.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleLoadMore = () => {
    setVisibleRestaurants((prevVisible) => prevVisible + 8);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className="px-4 border w-full">
      <FilterOption onFilterChange={setOpenNowFilter} />
      <h2 className="text-2xl">All Restaurants</h2>
      <div className="flex flex-wrap justify-start w-full">
        {restaurantData
          .filter((restaurant) =>
            openNowFilter
              ? restaurant.currentOpenStatusCategory === "OPEN"
              : true
          )
          .slice(0, visibleRestaurants)
          .map((restaurant, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="bg-white rounded-lg p-4 flex flex-col h-full border">
                <img
                  src={restaurant.heroImgUrl}
                  alt=""
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="h-full mt-2 pb-3 flex items-end">
                  <div className="flex flex-col w-full gap-1">
                    <h2 className="text-base font-medium">{restaurant.name}</h2>
                    <StarRating rating={5} />
                    <div className="flex flex-row justify-between">
                      <p className="text-xs">
                        {restaurant.parentGeoName}{" "}
                        {restaurant.priceTag ? restaurant.priceTag : "$"}
                      </p>
                      <div className="flex flex-row items-center gap-1">
                        <div className="w-3 h-3 bg-green-500 rounded-lg"></div>
                        <p className="text-xs">
                          {restaurant.currentOpenStatusText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to={`/detail/${restaurant.restaurantsId}`}>
                  <div className="h-full flex items-end">
                    <button className="bg-blue-950 w-full text-white text-xs py-3">
                      LEARN MORE
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        {visibleRestaurants < restaurantData.length && (
          <button
            onClick={handleLoadMore}
            className="bg-blue-950 text-white mb-5 text-xs w-36 py-3 mt-4 mx-auto block"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
