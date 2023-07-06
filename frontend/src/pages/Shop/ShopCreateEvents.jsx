import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import CreateEvent from "../../components/Shop/CreateEvent";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import Meta from "../../components/Meta";

const ShopCreateEvents = () => {
  return (
    <div>
      <Meta title="Shop's Creat Events" />

      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[330px]">
          <DashboardSideBar active={7} />
        </div>
        <div className="w-full justify-center flex">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEvents;
