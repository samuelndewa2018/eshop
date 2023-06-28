import React, { useState } from "react";
import axios from "axios";
import { server } from "../../server";
import Header from "../Layout/Header";

const CreateCarouselPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${server}/carousel/carousel`, {
        imageUrl,
        caption,
      });
      setSuccessMessage("Carousel item created successfully!");
      setErrorMessage("");
      // Reset form inputs
      setImageUrl("");
      setCaption("");
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Failed to create carousel item.");
      console.error("Error creating carousel item:", error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Create Carousel Item</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="caption">Caption:</label>
          <input
            type="text"
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <button type="submit">Create Carousel Item</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CreateCarouselPage;
