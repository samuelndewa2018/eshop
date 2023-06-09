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

      <button class="transition ease-in-out delay-150 duration-300 ... bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500">
        Save Changes
      </button>
    </div>
  );
};

export default TrialPage;
