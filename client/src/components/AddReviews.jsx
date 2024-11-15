import { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReviews = ({ reviewsSate, restaurantId }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("Rating");
  const [review, setReview] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const {
        data: { data: reviewData },
      } = await RestaurantFinder.post(`/${restaurantId}/reviews`, {
        name,
        review,
        restaurant_id: restaurantId,
        rating,
      });

      setName("");
      setRating("Rating");
      setReview("");

      reviewsSate((prevReviews) => {
        return [...prevReviews, reviewData.review];
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mb-2">
      <form action="">
        <div className="row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              className="form-control"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="Reviews">Reviews</label>
          <textarea
            name="reviews"
            id="Reviews"
            rows={10}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <button className="btn btn-primary mt-3" onClick={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
};

export default AddReviews;
