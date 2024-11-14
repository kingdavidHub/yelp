const StarRating = ({ rating }) => {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => {
        if (index < Math.floor(rating)) {
          return <i key={index} className="fa-solid fa-star"></i>;
        } else if (index < rating) {
          return <i key={index} className="fa-solid fa-star-half-stroke"></i>;
        } else {
          return <i key={index} className="fa-regular fa-star"></i>;
        }
      })}
    </>
  );
};

export default StarRating;

