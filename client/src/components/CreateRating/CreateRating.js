import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { calculationRate } from "../../helpers/functions";
import { changeDeviceRating } from "../../http/deviceApi";
import {
  changeDeviceRatingByUser,
  createRating,
  fetchDeviceRatings,
} from "../../http/ratingApi";
import Star from "./Star";

// Requirements:
//   1) The initial stars should be displayed
//   2) When the user enters the area, the same red color shows how many stars, and follows the user's mouse movement
//   3) When the user clicks the number of stars, the number of stars and rating becomes this new rating
//   4) If the user moves away and moves back in, now the user should be able to alter the rating again

export const CreateRating = observer(
  ({ numTotalStars = 5, initialRating = 0, userId, deviceId, onClick }) => {
    const [numSelectedStars, setNumSelectedStars] = useState(initialRating);
    const [numHoveringStars, setNumHoveringStars] = useState(null);

    const [isUserHovering, setIsUserHovering] = useState(false);

    function getColor(isUserHovering, i, numSelectedStars, numHoveringStars) {
      const threshold = isUserHovering ? numHoveringStars : numSelectedStars;
      return i < threshold ? "red" : "grey";
    }

    useEffect(() => {
      setNumSelectedStars(initialRating);
    }, [initialRating]);

    const addRating = (i) => {
      setNumSelectedStars(i);

      /**
       * if numSelectedStars <= it means that the user has not selected a rating
       *  and it is necessary to create a rating for this device
       */
      if (numSelectedStars <= 0) {
        createRating({
          rate: i,
          userId: userId,
          deviceId: deviceId,
        })
          .then(() => {
            fetchDeviceRatings(deviceId)
              .then(({ count, rows }) => {
                const amount = rows.reduce((agg, item) => {
                  return (agg += item.rate);
                }, 0);
                let calculatedRating = calculationRate(amount, count);
                console.log(calculatedRating);
                changeDeviceRating({
                  id: deviceId,
                  rating: `${calculatedRating}`,
                }).then(() => {
                  onClick();
                });
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      } else {
        /**
         * else we need to change the rating for this device
         */
        changeDeviceRatingByUser({
          rate: i,
          userId: userId,
          deviceId: deviceId,
        })
          .then(() => {
            fetchDeviceRatings(deviceId)
              .then(({ count, rows }) => {
                const amount = rows.reduce((agg, item) => {
                  return (agg += item.rate);
                }, 0);
                let calculatedRating = calculationRate(amount, count);
                console.log("changeDeviceRatingByUser ", calculatedRating);
                changeDeviceRating({
                  id: deviceId,
                  rating: `${calculatedRating}`,
                }).then(() => {
                  onClick();
                });
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      }
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
      </div>
    );
  }
);
