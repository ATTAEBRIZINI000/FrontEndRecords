import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Collection from "./components/Collection";
import NewRecordForm from "./components/NewRecordForm";
import Category from "./components/Category";
import RecordDetail from "./components/RecordDetail";
import UserProfile from "./components/UserProfil";
import Login from "./components/Login";
import Registration from "./components/Registration";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import { AuthProvider } from "./contexts/AuthContext"; // Import AuthProvider
import "./App.css";

function App() {
  const [records, setRecords] = useState([]);

  const updateRecord = (updatedRecord) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === updatedRecord.id ? updatedRecord : record
      )
    );
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} /> {/* Login route */}
          <Route path="/register" element={<Registration />} /> {/* Registration route */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/collections"
            element={
              <PrivateRoute>
                <Collection records={records} />
              </PrivateRoute>
            }
          />
          <Route
            path="/new-record"
            element={
              <PrivateRoute>
                <NewRecordForm setRecords={setRecords} />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <Category records={records} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/record-detail/:id"
            element={
              <PrivateRoute>
                <RecordDetail records={records} setRecords={setRecords} />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
