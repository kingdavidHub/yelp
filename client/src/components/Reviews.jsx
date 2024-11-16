import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  const lastThreeReviews = reviews.slice(-3);
  
  return (
    <>
      <div className="row row-cols-3 mb-2 justify-content-between  ">
        {lastThreeReviews &&
          lastThreeReviews.map((review) => (
            <div
              className="card text-white bg-primary m-2"
              style={{ maxWidth: "30%" }}
              key={review.id}
            >
              <div className="card-header d-flex justify-content-between flex-wrap">
                <span>{review.name}</span>
                <span>
                  <StarRating rating={review.rating} />
                </span>
              </div>

              <div className="card-body">
                <p className="text">{review.review}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Reviews;
