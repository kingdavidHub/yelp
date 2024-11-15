import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  
  return (
    <>
      <div className="row row-cols-3 mb-2">
        { reviews.length  &&
          reviews.map((review, index) => (
              <div
                className="card text-white bg-primary m-2"
                style={{ maxWidth: "31%" }}
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
          ))
        }
        {/* <div
          className="card text-white bg-primary m-2"
          style={{ maxWidth: "30%" }}
        >
          <div className="card-header d-flex justify-content-between">
            <span>Jane</span>
            <span>
              <StarRating />
            </span>
          </div>

          <div className="card-body">
            <p className="text">This restaurant was awesome</p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Reviews;
