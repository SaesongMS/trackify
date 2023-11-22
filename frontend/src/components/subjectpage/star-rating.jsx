import { createEffect, createSignal } from "solid-js";
import { patchData, postData } from "../../getUserData";

const StarRating = (props) => {
  const [rating, setRating] = createSignal(0);
  const [avgRating, setAvgRating] = createSignal(0);
  const [hoveredRating, setHoveredRating] = createSignal(0);
  const subject = props.subject;
  const itemId = props.itemId;

  const handleStarClick = (value) => {
    if (rating() === 0) {
      rate(value);
    } else {
      updateRating(value);
    }
    props.updateAvgRating();
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
  createEffect(() => {
    setRating(props.rating);
    setAvgRating(props.avgRating);
  });

  return (
    <div class=" pt-2 pl-2">
      <span class="pl-5 text-slate-200 text-2xl font-bold mr-2">
        Rate this {subject}:
      </span>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleStarClick(value)}
          onMouseEnter={() => setHoveredRating(value)}
          onMouseLeave={() => setHoveredRating(0)}
          style={{
            cursor: "pointer",
            fontSize: "24px",
            position: "relative",
            display: "inline-block",
            color: `${"black"}`,
          }}
        >
          <span
            style={{
              position: "absolute",
              overflow: "hidden",
              width: `${
                Math.max(
                  0,
                  Math.min(1, (hoveredRating() || avgRating()) - value + 1)
                ) * 100
              }%`,
              color: `${hoveredRating() ? "gold" : "orange"}`,
            }}
          >
            &#9733;
          </span>
          <span>&#9733;</span>
        </span>
      ))}
      <span class="text-orange-400">
        {avgRating() ? avgRating().toFixed(1) : 0}
      </span>
    </div>
  );
};

export default StarRating;
