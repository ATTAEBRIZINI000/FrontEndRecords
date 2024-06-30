import React, { useState, useEffect } from "react";
import "./UserProfil.css";
import { getUserProfile, updateUserProfile } from "../services/apiService";

const UserProfil = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Fetch user profile data when the component mounts
    getUserProfile()
      .then((response) => {
        const { firstname, name, pseudo, age, sexe } = response.data;
        setFirstName(firstname);
        setLastName(name);
        setPseudo(pseudo);
        setAge(age);
        setGender(sexe);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handlePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("pseudo", pseudo);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("password", password);

    updateUserProfile(formData)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="user-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profile Picture:</label>
          <input type="file" accept="image/*" onChange={handlePictureChange} />
          {profilePicture && (
            <img src={URL.createObjectURL(profilePicture)} alt="Profile" width="100" />
          )}
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Pseudo:</label>
          <input
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
          </select>
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserProfil;
