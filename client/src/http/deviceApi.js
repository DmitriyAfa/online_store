import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

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
