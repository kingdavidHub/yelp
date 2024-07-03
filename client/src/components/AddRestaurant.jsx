import React, { useState } from "react";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price_range, setPriceRange] = useState(1);

  return (
    <>
      <div className="mb-4 center">
        <form action="">
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={name}
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col">
              <input
                type="text"
                className="form-control"
                value={location}
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="col">
              <select 
              className="custom-select my-1 mr-sm-2" 
              value={price_range}
              onChange={(e) => setPriceRange(e.target.value)}>
                <option disabled>Price Range</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
              </select>
            </div>
          </div>
        </form>




        {/* <form>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="First name"
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
              />
            </div>
          </div>
        </form> */}
      </div>
    </>
  );
};


export default AddRestaurant;
