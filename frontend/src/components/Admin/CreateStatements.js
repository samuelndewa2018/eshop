import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";

const StatementsPage = () => {
  const [statements, setStatements] = useState([]);
  const [promotionName, setPromotionName] = useState("");
  const [typingName1, setTypingName1] = useState("");
  const [typingName2, setTypingName2] = useState("");
  const [typingName3, setTypingName3] = useState("");
  const [promotionImage, setPromotionImage] = useState("");
  const [promotionDetails, setPromotionDetails] = useState("");

  useEffect(() => {
    getStatements();
  }, []);

  const getStatements = async () => {
    try {
      const response = await axios.get(`${server}/statements/get-statements`);
      setStatements(response.data);
    } catch (error) {
      console.error("Failed to fetch statements:", error);
    }
  };
  const sortedNewProducts = statements.sort((a, b) => {
    return a.createdAt - b.createdAt;
  });
  console.log(sortedNewProducts);

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
      setStatements([...statements, response.data]);
    } catch (error) {
      console.error("Failed to create statement:", error);
    }
  };

  const deleteStatement = async (id) => {
    try {
      await axios.delete(`${server}/statements/${id}`);
      setStatements(statements.filter((statement) => statement._id !== id));
    } catch (error) {
      console.error("Failed to delete statement:", error);
    }
  };

  return (
    <div>
      <h1>Statements</h1>
      <div className="gap-10">
        <label>promotionName</label>
        <input
          type="text"
          value={promotionName}
          onChange={(e) => setPromotionName(e.target.value)}
        />
        <br />
        <label>typingName1</label>
        <input
          type="text"
          value={typingName1}
          onChange={(e) => setTypingName1(e.target.value)}
        />
        <br />
        <label>typingName2</label>
        <input
          type="text"
          value={typingName2}
          onChange={(e) => setTypingName2(e.target.value)}
        />
        <br />
        <label>typingName3</label>
        <input
          type="text"
          value={typingName3}
          onChange={(e) => setTypingName3(e.target.value)}
        />
        <br />
        <label>promotionImage</label>
        <input
          type="text"
          value={promotionImage}
          onChange={(e) => setPromotionImage(e.target.value)}
        />
        <br />
        <label>promotionDetails</label>
        <input
          type="text"
          value={promotionDetails}
          onChange={(e) => setPromotionDetails(e.target.value)}
        />
        <button onClick={createStatement}>Add Statement</button>
      </div>
      <ul>
        {sortedNewProducts && sortedNewProducts.slice(0, 1).map((i) => (
          <li key={i}>
            {i.promotionName}
            {/* <button onClick={() => deleteStatement(i._id)}>
              Delete
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatementsPage;
