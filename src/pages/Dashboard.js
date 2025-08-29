// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import {
  FaBell,
  FaWifi,
  FaBolt,
  FaGift,
  FaShieldAlt,
  FaMobileAlt,
  FaFileInvoiceDollar,
  FaStore,
  FaEllipsisH,
  FaHome,
  FaHistory,
  FaCamera,
  FaWallet,
  FaUser,
  FaPaperPlane,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
} from "react-icons/fa";


function Dashboard() {
  const navigate = useNavigate();
  const [accountBalance, setBalance] = useState(900000);
  useEffect(() => {
      getDashboard()}, []);

  const handleSendClick = () => {
    navigate("/transfer");
  };
  const getDashboard = async () => {
    const resp = await fetch('https://bank-api-dixj.onrender.com/api/v1/dashboard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // important for cookies
    });
    if (resp.ok) {
      const data = await resp.json();
      setBalance(data.account_balance);
      console.log(data);
    }
  }
  return (
    <div className="dashboard-container">
      {/* Top Bar */}
      <div className="top-bar">
        <img
          src="https://res.cloudinary.com/dqnwkkmzz/image/upload/v1756466673/IMG-20250828-WA0012_zxdpkr.jpg" /* Replace with your own avatar image path */
          alt="User Avatar"
          className="avatar"
        />
        <div className="notifications">
          <FaBell size={24} color="#fff" />
        </div>
      </div>

      {/* Balance Section */}
      <div className="balance-section">
        <p className="balance-label">Available Balance</p>
        <h1 className="balance-amount">${Number(accountBalance).toLocaleString()}</h1>
      </div>

      {/* Action Buttons (3) */}
      <div className="action-buttons">
        <div className="action-button" onClick={handleSendClick}>
          <FaPaperPlane />
          <span>Send</span>
        </div>
        <div className="action-button">
          <FaMoneyBillWave />
          <span>Deposit</span>
        </div>
        <div className="action-button">
          <FaMoneyCheckAlt />
          <span>Withdraw</span>
        </div>
      </div>

      {/* Payment List */}
      <div className="payment-list">
        <h2>Payment List</h2>
        <div className="payment-items">
          <div className="payment-item">
            <FaWifi />
            <span>Internet</span>
          </div>
          <div className="payment-item">
            <FaBolt />
            <span>Electricity</span>
          </div>
          <div className="payment-item">
            <FaGift />
            <span>Voucher</span>
          </div>
          <div className="payment-item">
            <FaShieldAlt />
            <span>Assurance</span>
          </div>
          <div className="payment-item">
            <FaMobileAlt />
            <span>Mobile</span>
          </div>
          <div className="payment-item">
            <FaFileInvoiceDollar />
            <span>Bill</span>
          </div>
          <div className="payment-item">
            <FaStore />
            <span>Merchant</span>
          </div>
          <div className="payment-item">
            <FaEllipsisH />
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="transaction-history">
        <h2>Transaction History</h2>
        <ul>
          <li className="transaction-item income">
            <div className="transaction-description">Payment from John</div>
            <div className="transaction-amount">+ $50,000</div>
          </li>
          <li className="transaction-item outcome">
            <div className="transaction-description">Transfer to Mary</div>
            <div className="transaction-amount">- $120,000</div>
          </li>
          <li className="transaction-item income">
            <div className="transaction-description">Received from ACME Corp</div>
            <div className="transaction-amount">+ $200,000</div>
          </li>
          <li className="transaction-item income">
            <div className="transaction-description">Payment from Bob</div>
            <div className="transaction-amount">+ $75,000</div>
          </li>
          <li className="transaction-item outcome">
            <div className="transaction-description">Transfer to Sarah</div>
            <div className="transaction-amount">- $150,000</div>
          </li>
          <li className="transaction-item outcome">
            <div className="transaction-description">Transfer to Michelle</div>
            <div className="transaction-amount">- $150,000</div>
          </li>
          <li className="transaction-item outcome">
            <div className="transaction-description">Transfer to NOah</div>
            <div className="transaction-amount">- $150,000</div>
          </li>
        </ul>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item">
          <FaHome size={20} />
          <span>Home</span>
        </div>
        <div className="nav-item">
          <FaHistory size={20} />
          <span>History</span>
        </div>

        {/* Center Scan Button */}
        <div className="scan-button">
          <FaCamera size={24} />
        </div>

        <div className="nav-item">
          <FaWallet size={20} />
          <span>Wallet</span>
        </div>
        <div className="nav-item">
          <FaUser size={20} />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
