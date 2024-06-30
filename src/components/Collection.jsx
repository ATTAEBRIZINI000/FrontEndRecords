/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import RecordDetail from "./RecordDetail";
import { getAllRecords } from "../services/apiService";
import "./Collection.css";

const Collection = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await getAllRecords();
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, []);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', options)
      .replace(/ /g, ', '); // Remplacer les espaces par des virgules
  };
  
  return (
    <div className="collection">
      <Link to="/new-record" className="new-button-link">
        New
      </Link>
      <div className="card-list">
        {records.map((record) => (
          <Link
            key={record.id}
            to={`/record-detail/${record.id}`}
            className="card-link"
          >
            <div className="card">
              <div className="card-header">
              <h3>{`${record.artist} - ${record.albumTitle} (${formatDate(record.date)})`}</h3>
  <p>{`${record.label} - Released Date: ${formatDate(record.date)}`}</p>
              </div>
              <div className="card-body">
                <p>Record Number: {record.vinylsNumber}</p>
                <p>State of the Records: {record.state}</p>
                <p className="category">{record.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Routes>
      <Route
  path="/record-detail/:id"
  element={<RecordDetail records={records} setRecords={setRecords} />}
/>

      </Routes>
    </div>
  );
};

export default Collection;
