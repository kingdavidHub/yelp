import React, { useEffect, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantsContext";

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        const {
          data: { restaurants },
        } = response.data;
        setRestaurants(restaurants);
      } catch (error) {
        console.log(error);
      }
    };
    getRestaurants();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const getRestaurants = async () => {
  //     try {
  //       const response = await RestaurantFinder.get("/");
  //       const {
  //         data: { restaurants },
  //       } = response.data;
  //       setRestaurants(restaurants);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getRestaurants();
  //   // when there is changes to the restaurants state call this UseEffect
  // }, [restaurants]);
  return (
    <>
      <div className="list-group">
        <table className="table table-hover table-dark">
          <thead className="thead-primary">
            <tr>
              <th scope="col">Restaurants</th>
              <th scope="col">Location</th>
              <th scope="col">Price Range</th>
              <th scope="col">Ratings</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {restaurants &&
              restaurants.map(({ id, name, location, price_range }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{location}</td>
                  <td>{"$".repeat(price_range)}</td>
                  <td>Rating</td>
                  <td>
                    <button className="btn btn-warning">Update</button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RestaurantList;
