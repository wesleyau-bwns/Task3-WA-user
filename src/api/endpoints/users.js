import protectedApi from "../protectedApi";

export const getProfile = () => {
  return protectedApi.get("/api/user/profile");
};

export const updateProfile = (data) => {
  return protectedApi.put("/api/user/profile", data);
};

export const updatePassword = (data) => {
  return protectedApi.put("/api/user/password", data);
};
