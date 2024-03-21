import React from "react";
import Slider from "./_components/Slider";
import GlobalApi from "./Utils/GlobalApi";
import CategoryPage from "./_components/CategoryPage";
import ProductPage from "./_components/ProductPage";
import Footer from "./_components/Footer";
import Banner from "./_components/Banner";

async function page() {
  const sliderlist = await GlobalApi.getSlider();
  const categorylist = await GlobalApi.getCetegoryList();
  const productsList = await GlobalApi.getProductsList();

  return (
    <div className="h-full w-full p-2 md:px-16 md:p-10 items-center ">
      <Slider sliderlist={sliderlist} />
      <CategoryPage categorylist={categorylist} />
      <ProductPage productsList={productsList} />
      <Banner />
      <Footer />
    </div>
  );
}

export default page;
