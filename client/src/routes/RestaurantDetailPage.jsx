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
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: {
            data: { restaurant },
          },
        } = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurants(restaurant);

        const {
          data: { data },
        } = await RestaurantFinder.get(`/${id}/reviews`);

        setReviews([data.reviews]);
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
              <Reviews reviews={reviews} />
              <AddReviews setReviews={setReviews} restaurantId={id} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantDetailPage;
