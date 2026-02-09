import api from "../Api/Axios";

export const register = (user) => {
  return api.post("/auth/register", user);
};

export const login = (user) => {
  return api.post("/auth/login", user);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
