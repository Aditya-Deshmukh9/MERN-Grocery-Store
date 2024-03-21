import GlobalApi from "@/app/Utils/GlobalApi";
import ProductPage from "@/app/_components/ProductPage";
import TopCategoryPage from "@/app/_components/TopCategoryPage";
import React from "react";

async function ProductCategoryPage({ params }) {
  const productsList = await GlobalApi.getProductsByCategory(
    params.categoryName
  );
  const categorylist = await GlobalApi.getCetegoryList();
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center bg-primary text-white py-3">
        {params.categoryName}
      </h2>
      <TopCategoryPage categorylist={categorylist} />
      <div className="px-6 md:px-16 mt-5">
        {productsList.length === 0 ? (
          <h2 className="text-3xl font-semibold text-center py-3">
            "No products found"
          </h2>
        ) : (
          <ProductPage productsList={productsList} />
        )}
      </div>
    </div>
  );
}

export default ProductCategoryPage;
