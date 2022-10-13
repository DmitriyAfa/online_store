import { $authHost, $host } from "./index";

export const createType = async (type) => {
  /**
   *
   * To create a type, the user must be authorized.
   * The role of "ADMIN" is needed. Checked by JWT.
   * /server/routes/typeRouter.js ---> checkRole("ADMIN")
   *
   */
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const fetchDevices = async () => {
  const { data } = await $host.get("api/device");
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};
