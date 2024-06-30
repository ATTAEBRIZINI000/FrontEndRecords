import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecordsByCategory } from "../services/apiService";
import "./Category.css"; // Import CSS file for Category

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords(selectedCategory);
  }, [selectedCategory]);

  const fetchRecords = (category) => {
    getRecordsByCategory(category)
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.error("Error fetching records:", error);
      });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filterRecordsByCategory = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  const renderFilteredCards = () => {
    return records.map((record, index) => (
      <div key={index} className="card">
        <div className="card-header">
          <h3>{`${record.artist} - ${record.albumTitle} (${record.date})`}</h3>
          <p>{`${record.label} - Released Date: ${record.date}`}</p>
        </div>
        <div className="card-body">
          <p>Record Number: {record.vinylsNumber}</p>
          <p>State of the Records: {record.state}</p>
          <p className="category">{record.category}</p>
        </div>
      </div>
    ));
  };

  const categories = ["All", "Rock Progressive", "AfroHouse", "Free Jazz", "Hip-Hop"];

  return (
    <div className="category">
      <div className="button-container">
        <Link to="/new-record" className="new-button-link">
          New
        </Link>
        <div className="category-select">
          <button className="category-button" onClick={toggleDropdown}>
            Category
          </button>
          <div className={`category-options ${isOpen ? "open" : ""}`}>
            {categories.map((category, index) => (
              <button
                key={index}
                className="category-option"
                onClick={() => filterRecordsByCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="card-list">{renderFilteredCards()}</div>
    </div>
  );
};

export default Category;
