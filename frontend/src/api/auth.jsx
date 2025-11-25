import api from "./axiosInstance";

const authService = {
  // LOGIN (POST)
  login: async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    return res.data;
  },

  // LOGOUT (POST or GET depending on your backend)
  logout: async () => {
    const res = await api.post("/auth/logout", {});
    return res.data;
  },

  // GET CURRENT USER / ME
  getMe: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },

  // REFRESH TOKEN (if your backend uses refresh tokens)
  refresh: async () => {
    const res = await api.post("/auth/refresh", {});
    return res.data;
  },

  // REGISTER (optional)
  register: async (data) => {
    const res = await api.post("/auth/register", data);
    return res.data;
  },
};

export default authService;
