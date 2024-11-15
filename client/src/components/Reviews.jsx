import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  const lastThreeReviews = reviews.slice(-3);
  return (
    <>
      <div className="row row-cols-3 mb-2 flex-row-reverse justify-content-between  ">
        {lastThreeReviews &&
          lastThreeReviews.map((review, index) => (
            <div
              className="card text-white bg-primary m-2"
              style={{ maxWidth: "30%" }}
              key={index}
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
