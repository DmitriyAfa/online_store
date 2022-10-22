import { useState } from "react";
import { createRating } from "../../http/ratingApi";
import Star from "./Star";

// Requirements:
//   1) The initial stars should be displayed
//   2) When the user enters the area, the same red color shows how many stars, and follows the user's mouse movement
//   3) When the user clicks the number of stars, the number of stars and rating becomes this new rating
//   4) If the user moves away and moves back in, now the user should be able to alter the rating again

export function CreateRating({
  numTotalStars = 5,
  initialRating = 0,
  userId,
  deviceId,
}) {
  const [numSelectedStars, setNumSelectedStars] = useState(initialRating);
  const [numHoveringStars, setNumHoveringStars] = useState(null);

  const [isUserHovering, setIsUserHovering] = useState(false);

  function getColor(isUserHovering, i, numSelectedStars, numHoveringStars) {
    const threshold = isUserHovering ? numHoveringStars : numSelectedStars;
    return i < threshold ? "red" : "grey";
  }

  const addRating = (i) => {
    setNumSelectedStars(i);
    createRating({
      rate: i,
      userId: userId,
      deviceId: deviceId,
    }).then(() => {
      alert(`Вы поставили рейтинг ${i}`);
    });
  };

  return (
    <div className="star-rating">
      <div
        onMouseEnter={() => setIsUserHovering(true)}
        onMouseLeave={() => setIsUserHovering(false)}
      >
        {Array.from({ length: numTotalStars }).map((e, i) => (
          <Star
            key={i}
            color={getColor(
              isUserHovering,
              i,
              numSelectedStars,
              numHoveringStars
            )}
            handleSelect={() => addRating(i + 1)}
            handleHover={() => setNumHoveringStars(i + 1)}
          />
        ))}
      </div>
      {/* <div className="label">rating {numSelectedStars}</div> */}
    </div>
  );
}
