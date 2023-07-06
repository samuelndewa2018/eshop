import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import UpdateProduct from "../../components/Shop/UpdateProduct";
import AllProducts from "../../components/Shop/AllProducts";
import EditProduct from "../../components/Shop/UpdateProduct";

const ShopUpdateProduct = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-full justify-center flex">
          <EditProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopUpdateProduct;
