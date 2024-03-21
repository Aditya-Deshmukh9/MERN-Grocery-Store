const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const getCetegory = () => axiosClient.get("/categories?populate=*");

const getSlider = () =>
  axiosClient.get("/sliders?populate=*").then((res) => {
    return res.data.data;
  });

const getCetegoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => {
    return res.data.data;
  });

const getProductsList = () =>
  axiosClient.get("/products?populate=*").then((res) => {
    return res.data.data;
  });

const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[category][name][$eq]=" + category + "&populate=*")
    .then((res) => {
      return res.data.data;
    });

const registeruser = (usename, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: usename,
    email: email,
    password: password,
  });

const loginuser = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addProductToCartApi = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const getCartItem = (userId, jwt) =>
  axiosClient
    .get("/user-carts?filters[userId][$eq]=" + userId + "&populate=*", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .then((res) => {
      return res.data.data;
    });

export default {
  getCetegory,
  getSlider,
  getCetegoryList,
  getProductsList,
  getProductsByCategory,
  registeruser,
  loginuser,
  addProductToCartApi,
  getCartItem,
};
