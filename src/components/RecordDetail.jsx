import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecordById, updateRecord, deleteRecord } from "../services/apiService";
import "./RecordDetail.css";

const RecordDetail = ({ records, setRecords }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState(null);

  useEffect(() => {
    getRecordById(id)
      .then((response) => {
        setRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching record:", error);
        navigate("/"); // Redirect to the collection page if there's an error
      });
  }, [id, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleSave = () => {
    const updatedRecord = {
      ...record,
      album_title: record.albumTitle,
      vinyls_number: record.vinylsNumber,
    };

    updateRecord(record.id, updatedRecord)
      .then(() => {
        const updatedRecords = records.map((r) =>
          r.id === record.id ? { ...r, recordState: "Updated" } : r
        );
        setRecords(updatedRecords);
      })
      .catch((error) => {
        console.error("Error updating record:", error);
      });
  };

  const handleDelete = () => {
    deleteRecord(record.id)
      .then(() => {
        const updatedRecords = records.filter((r) => r.id !== record.id);
        setRecords(updatedRecords);
        navigate("/"); // Redirect to the collection page after deletion
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!record) {
    return <p>Record not found</p>;
  }

  return (
    <div className="record-detail">
      <h2>Record Detail</h2>
      <form>
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={record.artist}
          onChange={(e) => setRecord({ ...record, artist: e.target.value })}
        />

        <label htmlFor="album_title">Album:</label>
        <input
          type="text"
          id="album_title"
          name="album_title"
          value={record.albumTitle}
          onChange={(e) => setRecord({ ...record, albumTitle: e.target.value })}
        />

        <label htmlFor="label">Label:</label>
        <input
          type="text"
          id="label"
          name="label"
          value={record.label}
          onChange={(e) => setRecord({ ...record, label: e.target.value })}
        />

        <label htmlFor="date">Released Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={record.date.split('T')[0]}
          onChange={(e) => setRecord({ ...record, date: e.target.value })}
        />

        <label htmlFor="vinyls_number">Record Number:</label>
        <input
          type="number"
          id="vinyls_number"
          name="vinyls_number"
          value={record.vinylsNumber}
          onChange={(e) => setRecord({ ...record, vinylsNumber: e.target.value })}
        />

        <label htmlFor="state">State of the Records:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={record.state}
          onChange={(e) => setRecord({ ...record, state: e.target.value })}
        />

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={record.category}
          onChange={(e) => setRecord({ ...record, category: e.target.value })}
        />

        <div className="form-buttons">
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordDetail;
