import { createEffect, createSignal } from "solid-js";
import { patchData, postData } from "../../getUserData";

const StarRating = (props) => {
  const [rating, setRating] = createSignal(0);
  const [hoveredRating, setHoveredRating] = createSignal(0);
  const subject = props.subject;
  const itemId = props.itemId;

  const handleStarClick = (value) => {
    if (rating() === 0) {
      rate(value);
    } else {
      updateRating(value);
    }
    props.setRating(value);
  };

  const rate = async (value) => {
    const res = postData(`ratings/rate-${subject}`, {
      itemId: itemId,
      rating: value,
    });
  };

  const updateRating = async (value) => {
    const res = patchData(`ratings/rerate-${subject}`, {
      itemId: itemId,
      rating: value,
    });
  };

  const handleStarHover = (value) => {
    setHoveredRating(value);
  };

  createEffect(() => {
    setRating(props.rating);
    //props.setRating(rating());
  });

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleStarClick(value)}
          onMouseEnter={() => handleStarHover(value)}
          onMouseLeave={() => setHoveredRating(0)}
          style={{
            cursor: "pointer",
            color: value <= (hoveredRating() || rating()) ? "gold" : "gray",
            fontSize: "24px",
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
