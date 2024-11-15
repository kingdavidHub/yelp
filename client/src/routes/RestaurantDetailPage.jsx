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
          data: { data: reviewsData },
        } = await RestaurantFinder.get(`/${id}/reviews`);

        setReviews(reviewsData.reviews);
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
              <h1 className="text-center m-3">{selectedRestaurants.name}</h1>
              <Reviews reviews={reviews} />
              <AddReviews reviewsSate={setReviews} restaurantId={id} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantDetailPage;
