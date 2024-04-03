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

const getSearchProducts = (query) =>
  axiosClient
    .get("/products?populate=*&filters[title][$containsi]=" + query)
    .then((res) => {
      return res.data.data;
    });

const getSearchDeatils = (query) =>
  axiosClient
    .get("/products?populate=*&filters[slug][$containsi]=" + query)
    .then((res) => {
      return res.data.data;
    });

const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[category][slug][$eq]=" + category + "&populate=*")
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
    .get(
      "/user-carts?filters[userId][$eq]=" +
        userId +
        "&[populate][products][populate][images][populate][0]=url",
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((res) => {
      const data = res.data.data;
      const cartItemsList = data.map((item) => ({
        title: item?.attributes?.products?.data?.attributes?.title,
        quantity: item?.attributes?.quantity,
        amount: item?.attributes?.amount,
        imgurl:
          item?.attributes?.products?.data?.attributes?.images?.data[0]
            ?.attributes?.url,
        actualPrice: item?.attributes?.products?.data?.attributes?.mrp,
        id: item?.id,
        product: item?.attributes?.products?.data?.id,
      }));

      return cartItemsList;
    });

const deleteCartItems = (itemId, jwt) =>
  axiosClient.delete("/user-carts/" + itemId, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const createOrder = (data, jwt) =>
  axiosClient.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getProfile = (jwt) =>
  axiosClient.get("/users/me", {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getMyOrder = (userid, jwt) =>
  axiosClient
    .get(
      "/orders?filters[userid][$eq]=" +
        userid +
        "&populate[orderitemlist][populate][product][populate][images]=url",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const responce = resp.data.data;
      const orderList = responce.map((item) => ({
        id: item.id,
        totalOrderAmount: item.attributes.totalOrderAmount,
        paymentId: item.attributes.paymentid,
        orderItemList: item.attributes.orderitemlist,
        createdAt: item.attributes.createdAt,
        status: item.attributes.status,
      }));

      return orderList;
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
  deleteCartItems,
  createOrder,
  getMyOrder,
  getProfile,
  getSearchProducts,
  getSearchDeatils,
};
