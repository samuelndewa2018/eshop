import React, { useState } from "react";
import { AiOutlinePause } from "react-icons/ai";

const TrialPage = () => {
  const [sort, setSort] = useState(null);
  const [grid, setGrid] = useState(4);

  return (
    <div>
      heeeeeeeeeeeey
      <div className="filter-sort-grid mb-4">
        <div className="flex justify-between align-center">
          <div className="flex aligncenter gap-10">
            <p className="">Sort By:</p>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select an option
            </label>
            <select
              onChange={(e) => setSort(e.target.value)}
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="best-selling" selected disabled>
                Choose how to sort
              </option>
              {/* <option value="best-selling">Best Selling</option> */}
              <option value="title">Alphabetically, A-Z</option>
              <option value="-title">Alphabetically, Z-A</option>
              <option value="price">Price, low to high</option>
              <option value="-price">Price, high to low</option>
              <option value="createdAt">Date, old to new</option>
              <option value="-createdAt">Date, new to old</option>
            </select>
          </div>
          <div className="flex align-center gap-10">
            <p className="total-products mb-0">21 products</p>
            <div className="flex gap-10 align-center">
              <svg
                className="icon icon-col-4 w-9"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 13.5 12.5"
                onClick={() => {
                  setGrid(4);
                }}
              >
                <defs></defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <g id="shop_page" data-name="shop page">
                      <g id="_4_col" data-name="4_col">
                        <path
                          id="Rectangle"
                          d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z"
                        ></path>
                        <path
                          id="Rectangle-2"
                          d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z"
                          data-name="Rectangle"
                        ></path>
                        <path
                          id="Rectangle-3"
                          d="M8.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 018.75 0z"
                          data-name="Rectangle"
                        ></path>
                        <path
                          id="Rectangle-4"
                          d="M12.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11a.76.76 0 01.75-.75z"
                          data-name="Rectangle"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <svg
                className="icon icon-col-3 w-9"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 9.5 12.5"
                onClick={() => {
                  setGrid(4);
                }}
              >
                <defs></defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <g id="shop_page" data-name="shop page">
                      <g id="Group-16">
                        <path
                          id="Rectangle"
                          d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z"
                        ></path>
                        <path
                          id="Rectangle-2"
                          d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z"
                          data-name="Rectangle"
                        ></path>
                        <path
                          id="Rectangle-3"
                          d="M8.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 018.75 0z"
                          data-name="Rectangle"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <svg
                className="icon icon-col-2 w-9"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 5.5 12.5"
                onClick={() => {
                  setGrid(6);
                }}
              >
                <defs></defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <g id="shop_page" data-name="shop page">
                      <g id="Group-10">
                        <path
                          id="Rectangle"
                          d="M.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 01.75 0z"
                        ></path>
                        <path
                          id="Rectangle-2"
                          d="M4.75 0a.76.76 0 01.75.75v11a.76.76 0 01-.75.75.76.76 0 01-.75-.75v-11A.76.76 0 014.75 0z"
                          data-name="Rectangle"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <svg
                className="icon icon-list w-9"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12.5 9.5"
                onClick={() => {
                  setGrid(12);
                }}
              >
                <defs></defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <g id="shop_page" data-name="shop page">
                      <g id="Group-16">
                        <path
                          id="Rectangle"
                          d="M12.5.75a.76.76 0 01-.75.75h-11A.76.76 0 010 .75.76.76 0 01.75 0h11a.76.76 0 01.75.75z"
                        ></path>
                        <path
                          id="Rectangle-2"
                          d="M12.5 4.75a.76.76 0 01-.75.75h-11A.76.76 0 010 4.75.76.76 0 01.75 4h11a.76.76 0 01.75.75z"
                          data-name="Rectangle"
                        ></path>
                        <path
                          id="Rectangle-3"
                          d="M12.5 8.75a.76.76 0 01-.75.75h-11A.76.76 0 010 8.75.76.76 0 01.75 8h11a.76.76 0 01.75.75z"
                          data-name="Rectangle"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialPage;
