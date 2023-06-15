import React, { useEffect, useState } from "react";

import Header from "../components/Layout/Header";
import { AiOutlineArrowRight } from "react-icons/ai";

const TrialPage = () => {
  return (
    <div>
      <Header />

      <span class="relative flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-5 w-3 bg-sky-500"></span>
      </span>

      {/* jk */}
      <div class="rounded-md p-4 w-full mx-auto">
        <div class="animate-pulse block">
          <div class="rounded-md bg-slate-200 h-10 w-full mt-2"></div>
          <div class="rounded-md bg-slate-200 h-8 w-full mt-2"></div>
          <div class="rounded-md bg-slate-200 h-10 w-full mt-2"></div>
        </div>
      </div>

      <div class="arrow bounce">
        <AiOutlineArrowRight />
      </div>
    </div>
  );
};

export default TrialPage;
