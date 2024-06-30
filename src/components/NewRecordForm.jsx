import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecord } from "../services/apiService";
import "./NewRecordForm.css"; // Import CSS file for NewRecordForm

const NewRecordForm = ({ setRecords }) => {
  const [form, setForm] = useState({
    artist: "",
    album: "",
    label: "",
    releaseDate: "",
    releaseDateType: "date", // Added field for release date type
    category: "Rock Progressive",
    recordNumber: "",
    recordState: "New", // Default record state
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate and update form state based on input type
    if (name === "recordNumber" && isNaN(value)) {
      return; // Prevent non-numeric input for recordNumber
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure recordNumber is not negative
    if (parseInt(form.recordNumber) < 0) {
      alert("Record Number cannot be negative.");
      return;
    }

    createRecord(form)
      .then((response) => {
        setRecords((prevRecords) => {
          return [...prevRecords, response.data];
        });
        navigate("/collections");
      })
      .catch((error) => {
        console.error("Error creating record:", error);
      });
  };

  return (
    <div className="new-record-form">
      <h2>New Record Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={form.artist}
          onChange={handleChange}
        />

        <label htmlFor="album">Album:</label>
        <input
          type="text"
          id="album"
          name="album"
          value={form.album}
          onChange={handleChange}
        />

        <label htmlFor="label">Label:</label>
        <input
          type="text"
          id="label"
          name="label"
          value={form.label}
          onChange={handleChange}
        />

        <label htmlFor="releaseDate">Released Date:</label>
        <input
          type={form.releaseDateType} // Dynamic type based on form field
          id="releaseDate"
          name="releaseDate"
          value={form.releaseDate}
          onChange={handleChange}
        />

        <label htmlFor="recordNumber">Record Number:</label>
        <input
          type="number"
          id="recordNumber"
          name="recordNumber"
          value={form.recordNumber}
          onChange={handleChange}
        />

        <label htmlFor="recordState">State of the Records:</label>
        <select
          id="recordState"
          name="recordState"
          value={form.recordState}
          onChange={handleChange}
        >
          <option value="New">New</option>
          <option value="Used">Used</option>
          <option value="Damaged">Damaged</option>
        </select>

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="Rock Progressive">Rock Progressive</option>
          <option value="HipHop">HipHop</option>
          <option value="AfroHouse">AfroHouse</option>
          <option value="Free Jazz">Free Jazz</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewRecordForm;
