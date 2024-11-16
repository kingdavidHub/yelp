import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantsContext";
import Reviews from "../components/Reviews";
import AddReviews from "../components/AddReviews";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurants, setSelectedRestaurants } =
    useContext(RestaurantContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { data: restaurantData },
        } = await RestaurantFinder.get(`/${id}`);

        setSelectedRestaurants(restaurantData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        {selectedRestaurants && (
          <>
            <div className="mt-3">
              <h1 className="text-center m-1 display-3">
                {selectedRestaurants.restaurant.name}
              </h1>
              <Reviews reviews={selectedRestaurants.reviews} />
              <AddReviews />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantDetailPage;
