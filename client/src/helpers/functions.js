export const calculationRating = (ratings, deviceId, callback1, callback2) => {
  if (ratings) {
    let rating = [];
    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i].deviceId === deviceId) {
        rating.push(ratings[i].rate);
      }
    }
    const count = rating.length;
    let rate = rating.reduce((agg, curr) => {
      return (agg += curr);
    }, 0);
    rate = rate / count;
    rate = rate % 1 > 0 ? rate.toFixed(1) : rate;
    callback1(count);
    callback2(rate);
  }
};

export const findRate = (ratings, userId, callback1) => {
  if (ratings) {
    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i].userId === userId) {
        callback1(ratings[i].rate);
      }
    }
  }
};
