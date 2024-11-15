import React, { useContext, useEffect } from "react";
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
          data: {
            data: { restaurant },
          },
        } = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurants(restaurant);
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
              <Reviews />
              <AddReviews />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantDetailPage;
