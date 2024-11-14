import React, { useEffect, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantsContext";
import { Link, useNavigate } from "react-router-dom";

const RestaurantList = () => {
  const navigate = useNavigate();
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

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    navigate(`/restaurant/${id}/update`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurant/${id}/detail`);
  };

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
                <tr onClick={() => handleRestaurantSelect(id)} key={id}>
                  <td>{name}</td>
                  <td>{location}</td>
                  <td>{"$".repeat(price_range)}</td>
                  <td>Rating</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={(e) => handleUpdate(e, id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(e, id)}
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
