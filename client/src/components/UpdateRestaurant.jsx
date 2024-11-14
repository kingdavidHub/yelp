import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const submitUpdate = async (e) => {
    e.preventDefault();

    if (priceRange < 1 || priceRange > 5) {
      alert("Price range must be between 1 and 5");
      return;
    }

    const response = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });

    if (response.status === 200) {
      navigate("/");
    }
  };

  useEffect(() => {
    const getSingleRestaurant = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      const {
        data: {
          restaurant: { name, location, price_range },
        },
      } = response.data;
      setName(name);
      setLocation(location);
      setPriceRange(price_range);
    };

    getSingleRestaurant();
  }, []);

  return (
    <>
      <div className="container">
        <form action="">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price_range">Price Range</label>
            <input
              type="number"
              id="price_range"
              className="form-control"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              min={1}
              max={5}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3"
            onClick={submitUpdate}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateRestaurant;
