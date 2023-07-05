import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";

const StatementsPage = () => {
  // const [statements, setStatements] = useState([]);
  const [promotionName, setPromotionName] = useState("");
  const [typingName1, setTypingName1] = useState("");
  const [typingName2, setTypingName2] = useState("");
  const [typingName3, setTypingName3] = useState("");
  const [promotionImage, setPromotionImage] = useState("");
  const [promotionDetails, setPromotionDetails] = useState("");

  // useEffect(() => {
  //   getStatements();
  // }, []);

  // const getStatements = async () => {
  //   try {
  //     const response = await axios.get(`${server}/statements/get-statements`);
  //     setStatements(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch statements:", error);
  //   }
  // };

  const { statements } = useSelector((state) => state.statements);

  const createStatement = async () => {
    try {
      const response = await axios.post(
        `${server}/statements/create-statements`,
        {
          promotionName: promotionName,
          typingName1: typingName1,
          typingName2: typingName2,
          typingName3: typingName3,
          promotionImage: promotionImage,
          promotionDetails: promotionDetails,
        }
      );
      // setStatements([...statements, response.data]);
    } catch (error) {
      console.error("Failed to create statement:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Create Statements</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Promotion Name</label>
          <input
            type="text"
            value={promotionName}
            onChange={(e) => setPromotionName(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
        <div>
          <label className="block mb-2">Typing Name 1</label>
          <input
            type="text"
            value={typingName1}
            onChange={(e) => setTypingName1(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
        <div>
          <label className="block mb-2">Typing Name 2</label>
          <input
            type="text"
            value={typingName2}
            onChange={(e) => setTypingName2(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
        <div>
          <label className="block mb-2">Typing Name 3</label>
          <input
            type="text"
            value={typingName3}
            onChange={(e) => setTypingName3(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
        <div>
          <label className="block mb-2">Promotion Image</label>
          <input
            type="text"
            value={promotionImage}
            onChange={(e) => setPromotionImage(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
        <div>
          <label className="block mb-2">Promotion Details</label>
          <input
            type="text"
            value={promotionDetails}
            onChange={(e) => setPromotionDetails(e.target.value)}
            className="w-full border border-gray-300 rounded py-2 px-3"
          />
        </div>
      </div>
      <button
        onClick={createStatement}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Statement
      </button>
      <div class="container mx-auto p-8">
        <h1 class="text-3xl font-bold mb-4">Current Statements</h1>
        <ul class="grid gap-6">
          {statements &&
            statements.map((statement) => (
              <li key={statement._id} class="bg-white shadow-md rounded-md">
                <div class="grid grid-cols-2 gap-4 p-6">
                  <div>
                    <p class="font-bold">Promotion Name:</p>
                    <p>{statement.promotionName}</p>
                  </div>
                  <div class="col-span-2">
                    <p class="font-bold">Typing Name 1:</p>
                    <p>{statement.typingName1}</p>
                  </div>
                  <div class="col-span-2">
                    <p class="font-bold">Typing Name 2:</p>
                    <p>{statement.typingName2}</p>
                  </div>
                  <div class="col-span-2">
                    <p class="font-bold">Typing Name 3:</p>
                    <p>{statement.typingName3}</p>
                  </div>
                  <div class="col-span-2">
                    <p class="font-bold">promotion Image Url:</p>
                    <p>{statement.promotionImage}</p>
                  </div>
                  <div class="col-span-2">
                    <p class="font-bold">Promotion Details:</p>
                    <p>{statement.promotionDetails}</p>
                  </div>
                  <div class="col-span-2 sm:col-span-1">
                    <img
                      class="w-full h-auto m-2"
                      src={statement.promotionImage}
                      alt="Promotion Image1"
                    />
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default StatementsPage;
