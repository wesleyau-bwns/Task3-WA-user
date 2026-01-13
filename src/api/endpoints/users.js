import protectedApi from "../protectedApi";
import fileUploadApi from "../fileUploadApi";

export const getProfile = () => {
  return protectedApi.get("/api/user/profile");
};

export const updateProfile = (data) => {
  return fileUploadApi.post("/api/user/profile", data);
};

export const updatePassword = (data) => {
  return protectedApi.put("/api/user/password", data);
};
