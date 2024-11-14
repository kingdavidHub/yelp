import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantsContext";
import StarRating from "../components/StarRating";

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
    {
      selectedRestaurants && <div className="container">
        <StarRating rating={3.3}/>
      </div>
    }
    </>
  );
};

export default RestaurantDetailPage;
