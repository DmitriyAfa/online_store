import { $host, $authHost } from ".";
export const createRating = async (rating) => {
  const { data } = await $authHost.post("api/rating", rating);
  return data;
};

export const fetchDeviceRatings = async (deviceId) => {
  const { data } = await $host.get("api/rating", {
    params: {
      deviceId,
    },
  });
  return data;
};

export const fetchUserRating = async (userId, deviceId) => {
  const { data } = await $host.get("api/rating", {
    params: {
      userId,
      deviceId,
    },
  });
  return data;
};

export const changeDeviceRatingByUser = async ({ rate, userId, deviceId }) => {
  const { data } = await $host.put("api/rating", {
    rate,
    userId,
    deviceId,
  });
  return data;
};
