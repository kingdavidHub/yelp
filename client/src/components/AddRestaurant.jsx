import React, { useContext, useEffect, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const submitHandler = async (e) => {
    e.preventDefault();
    setName("");
    setLocation("");
    setPriceRange("Price Range");

    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });

      const {
        data: { restaurant },
      } = response.data;
      addRestaurants(restaurant);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mb-4 center">
        <form action="">
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col">
              <input
                type="text"
                className="form-control"
                name="location"
                value={location}
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="col">
              <select
                style={{ width: "70%" }}
                name="price_range"
                className="custom-select my-1 mr-sm-2"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option disabled>Price Range</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
              </select>
            </div>

            <div className="col">
              <button
                type="submit"
                style={{ width: "100%" }}
                className="btn btn-primary"
                onClick={submitHandler}
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRestaurant;
