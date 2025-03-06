import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Transfer() {
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  
  const [showPinModal, setShowPinModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  // Handle account number input
  const handleAccountChange = async (e) => {
    const value = e.target.value;
    setAccountNumber(value);
  
    // Use static data for the special account number
    if (value === "1220364125") {
     // set sleep for 1 sec
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        console.log("try called ")
        const response = await fetch(`https://bank-api-dixj.onrender.com/api/v1/acct_detail`);
        if (!response.ok) {
          throw new Error("API error");
        }
        const data = await response.json();
        console.log(data);
        setRecipientName(data.recipient_name);
        setBankName(data.recipient_bank);
      } catch (error) {
        console.error("Failed to fetch account details:", error);
        setRecipientName("");
        setBankName("");
      }
    } else {
      // Clear recipient info if the account number length is not valid
      
      setRecipientName("");
      setBankName("");
    }
  };
  // Handle the "Transfer" button click
  const handleTransferClick = () => {
    if (!amount) {
      alert("Please enter an amount.");
      return;
    }
    setShowPinModal(true);
  };

  // Submit PIN
  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (pin === "4512") {
      setShowPinModal(false);
      setShowSuccessModal(true);
      //send api call to transfer http://127.0.0.1:8000/api/v1/transfer
      const response = await fetch('https://bank-api-dixj.onrender.com/api/v1/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "amount_sent": amount }),
        credentials: 'include', // important for cookies
      });
      if (response.ok) {
        // Login successful: show success popup and redirect after delay
        // setShowSuccess(true);
        // setTimeout(() => {
        //   navigate('/');
        // }, 2000);
        const data = await response.json();
        console.log(data);
      } else {
        const data = await response.json();
        console.log(data.error)
      }
    //   } catch (err) {
    //     setError('Failed to connect to server');
    //     console.error(err);
    //     }
      
    } else {
      alert("Incorrect PIN!");
    }
  };

  // Close success modal (reset if needed)
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    // Optionally reset fields or navigate away
    navigate('/');
  };

  return (
    <div className="transfer-container">
      {/* Header */}
      <div className="transfer-header">
        <h2>Transfer to Bank Account</h2>
        {/* <span className="transfer-history-link">History</span> */}
      </div>

      {/* Banner (example) */}
      <div className="transfer-banner">
        <p>Free transfers for the day: 3</p>
      </div>

      {/* Transfer Form */}
      <div className="transfer-form">
        <label>Recipient Account</label>
        <input
          type="text"
          placeholder="Enter 10 digits Account Number"
          value={accountNumber}
          onChange={handleAccountChange}
        />

        {/* Show recipient info & amount field once account is valid */}
        {recipientName && bankName && (
          <>
            <div className="recipient-info">
              <p>Recipient: {recipientName}</p>
              <p>Bank: {bankName}</p>
            </div>

            <label>Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <button className="transfer-btn" onClick={handleTransferClick}>
              Transfer
            </button>
          </>
        )}
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Enter PIN</h3>
            <form onSubmit={handlePinSubmit}>
              <input
                type="password"
                placeholder="4-digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
              <button type="submit">Confirm</button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-content success">
            <h3>Transfer Successful</h3>
            <p>Recipient: {recipientName}</p>
            <p>Bank: {bankName}</p>
            <p>Amount: ${Number(amount).toLocaleString()}</p>
            <p>Date: {new Date().toLocaleString()}</p>
            <p>Transaction ID:8578935873496</p>
            <p>Free transfers left: 2</p>
            <p>Thank you for using our service!</p>

            <button onClick={handleCloseSuccessModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transfer;
