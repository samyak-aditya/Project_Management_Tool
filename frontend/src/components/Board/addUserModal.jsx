import React, { useState } from "react";
import axios from "axios";
import styles from "./addUserModal.css"; // Ensure the file extension matches the actual file

const AddUserModal = ({ isOpen, onClose }) => {
  const [emailInput, setEmailInput] = useState(""); // State to hold the email input value
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [userId, setUserId] = useState(""); // Assuming you have a way to get the logged-in user's ID

  const handleEmailInputChange = (event) => {
    setEmailInput(event.target.value);
  };

  const handleAddEmail = () => {
    setSelectedEmails((prevSelected) => [...prevSelected, emailInput]);
    setEmailInput(""); // Clear input after adding
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/task/users/add", {
        userId: userId, // Send the logged-in user's ID
        selectedEmails: selectedEmails, // Send the selected email addresses
      });

      console.log("Response after saving:", response.data);
      onClose();
    } catch (error) {
      console.error("Error saving selected emails:", error);
    }
  };

  return isOpen ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Select Users</h2>
        <div className={styles.emailList}>
          <div className={styles.emailItem}>
            <input
              type="text"
              value={emailInput}
              onChange={handleEmailInputChange}
              placeholder="Enter Email"
            />
            <button onClick={handleAddEmail}>Add Email</button>
          </div>
          {/* Display selected emails */}
          {selectedEmails.map((email, index) => (
            <div key={index} className={styles.emailItem}>
              <input
                type="checkbox"
                checked={true}
                onChange={() =>
                  setSelectedEmails((prevSelected) =>
                    prevSelected.filter((selectedEmail) => selectedEmail !== email)
                  )
                }
              />
              <label>{email}</label>
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddUserModal;
