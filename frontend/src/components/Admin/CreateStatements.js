import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";

const StatementsPage = () => {
  const [statements, setStatements] = useState([]);
  const [newStatement, setNewStatement] = useState("");
  const [typingNames, setTypingNames] = useState([]);

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

  const createStatement = async () => {
    try {
      const response = await axios.post(
        `${server}/statements/create-statements`,
        {
          promotionName: newStatement,
          typingNames: typingNames,
        }
      );
      setStatements([...statements, response.data]);
      setNewStatement("");
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
      <div>
        <input
          type="text"
          value={newStatement}
          onChange={(e) => setNewStatement(e.target.value)}
        />
        <br />
        hi
        <input
          type="text"
          value={typingNames}
          onChange={(e) => setTypingNames(e.target.value)}
        />
        <button onClick={createStatement}>Add Statement</button>
      </div>
      <ul>
        {statements.map((statement) => (
          <li key={statement._id}>
            {statement.promotionName}
            <button onClick={() => deleteStatement(statement._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatementsPage;

// import React, { useState } from "react";
// import axios from "axios";

// const StatementsPage = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [variations, setVariations] = useState([]);

//   const handleVariationChange = (index, field, value) => {
//     const updatedVariations = [...variations];
//     updatedVariations[index][field] = value;
//     setVariations(updatedVariations);
//   };

//   const handleAddVariation = () => {
//     setVariations([...variations, { name: "", price: 0, color: "", size: "" }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("/api/products", {
//         name,
//         description,
//         variations,
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error:", error.response.data);
//     }
//   };

//   return (
//     <div>
//       <h1>Create Product</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <label htmlFor="description">Description:</label>
//         <textarea
//           id="description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         ></textarea>

//         <h3>Variations:</h3>
//         {variations.map((variation, index) => (
//           <div key={index}>
//             <label htmlFor="variationName">Name:</label>
//             <input
//               type="text"
//               id="variationName"
//               value={variation.name}
//               onChange={(e) =>
//                 handleVariationChange(index, "name", e.target.value)
//               }
//             />

//             <label htmlFor="variationPrice">Price:</label>
//             <input
//               type="number"
//               id="variationPrice"
//               value={variation.price}
//               onChange={(e) =>
//                 handleVariationChange(index, "price", e.target.value)
//               }
//             />

//             <label htmlFor="variationColor">Color:</label>
//             <input
//               type="text"
//               id="variationColor"
//               value={variation.color}
//               onChange={(e) =>
//                 handleVariationChange(index, "color", e.target.value)
//               }
//             />

//             <label htmlFor="variationSize">Size:</label>
//             <input
//               type="text"
//               id="variationSize"
//               value={variation.size}
//               onChange={(e) =>
//                 handleVariationChange(index, "size", e.target.value)
//               }
//             />
//           </div>
//         ))}

//         <button type="button" onClick={handleAddVariation}>
//           Add Variation
//         </button>

//         <button type="submit">Create Product</button>
//       </form>
//     </div>
//   );
// };

// export default StatementsPage;
