import React, { useState } from "react";
import Header from "../components/Layout/Header";
import CustomModal from "../components/CustomModal";

const TrialPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [agree, setAgree] = useState(false);

  const trueModel = () => {
    setModalOpen(true);
    setAgree(false);
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <div class="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]"></div>
        <br />
        {/* <div class="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]"></div> */}
      </div>
    </div>
  );
};

export default TrialPage;
