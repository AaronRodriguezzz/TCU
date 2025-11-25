import api from "./axiosInstance";

export const apiService = (endpoint) => {
  return {
    // GET ALL
    getAll: async () => {
      const res = await api.get(`/${endpoint}`);
      return res.data;
    },

    // GET ONE
    get: async (id) => {
      const res = await api.get(`/${endpoint}/${id}`);
      return res.data;
    },

    // CREATE
    create: async (data) => {
      const res = await api.post(`/${endpoint}`, data);
      return res.data;
    },

    // UPDATE
    update: async (id, data) => {
      const res = await api.put(`/${endpoint}/${id}`, data);
      return res.data;
    },

    // DELETE
    remove: async (id) => {
      const res = await api.delete(`/${endpoint}/${id}`);
      return res.data;
    },
  };
};
