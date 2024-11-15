const StarRating = ({ rating }) => {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => {
        if (index < Math.floor(rating)) {
          return <i key={index} className="fa-solid fa-star text-warning"></i>;
        } else if (index < rating) {
          return <i key={index} className="fa-solid fa-star-half-stroke text-warning"></i>;
        } else {
          return <i key={index} className="fa-regular fa-star text-warning"></i>;
        }
      })}
    </>
  );
};

export default StarRating;

