import React, { useState } from "react";
import { AiOutlinePause } from "react-icons/ai";
import Header from "../components/Layout/Header";
import CustomModal from "../components/CustomModal";

const TrialPage = () => {
  const [sort, setSort] = useState(null);
  const [grid, setGrid] = useState(4);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Header />
      <button
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
        class="block text-white m-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setOpen(true)}
      >
        Toggle modal
      </button>
      <CustomModal
        open={open}
        title="Are you sure you want to delete this product?"
      />
    </div>
  );
};

export default TrialPage;
