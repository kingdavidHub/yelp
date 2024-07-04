import React, { useState } from "react";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price_range, setPriceRange] = useState(1);

  return (
    <>
      <div className="mb-4 center">
        <div className="container">
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
                style={{width: "70%"}}
                  className="custom-select my-1 mr-sm-2"
                  value={price_range}
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
                <button style={{ width: "100%" }} className="btn btn-primary">Add</button>
              </div>
            </div>
          </form>
        </div>

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
