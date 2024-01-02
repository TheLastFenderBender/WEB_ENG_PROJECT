import React, { useState, useEffect } from 'react';
import './RefundView.css'; // Import the CSS module

const RefundView = () => {
  const [refunds, setRefunds] = useState([]);
  const [status, setStatus] = useState('');

  const fetchRefunds = async () => {
    try {
      const response = await fetch('http://localhost:3000/getRefunds');
      const data = await response.json();

      if (Array.isArray(data)) {
        setRefunds(data);
      } else {
        console.error('Invalid data received from the server:', data);
      }
    } catch (error) {
      console.error('Error fetching refunds:', error);
    }
  };

  useEffect(() => {
    // Fetch refund records from the backend API
    fetchRefunds();
  }, []);

  const handleDeleteRefund = async (refund) => {
    try {
      const response = await fetch(`http://localhost:3000/deleteRefund/${refund._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful deletion
        console.log('Refund deleted successfully');
        setRefunds((prevRefunds) => prevRefunds.filter((item) => item._id !== refund._id));
      } else {
        console.error('Failed to delete refund');
      }
    } catch (error) {
      console.error('Error deleting refund:', error);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (refund) => {
    try {
      const response = await fetch(`http://localhost:3000/updateRefund/${refund._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refundStatus: status }),
      });

      if (response.ok) {
        console.log('Refund status updated successfully');
        // Fetch refunds again after a successful update
        fetchRefunds();
      } else {
        console.error('Failed to update refund status');
      }
    } catch (error) {
      console.error('Error updating refund status:', error);
    }
  };

  return (
    <div className="refund-view-container">
      <h4 className="refund-view-heading">Refund Records</h4>
      <table className="refund-view-table">
        <thead>
          <tr>
            <th>Refund ID</th>
            <th>User ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {refunds.map((refund) => (
            <tr key={refund._id}>
              <td>{refund._id}</td>
              <td>{refund.userId}</td>
              <td>{refund.amount}</td>
              <td>{refund.refundStatus}</td>
              <td>
                <select value={status} onChange={handleStatusChange} className="refund-view-select">
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="denied">Denied</option>
                </select>
                <button onClick={() => handleSubmit(refund)} className="refund-view-button">
                  Update Status
                </button>
                <button onClick={() => handleDeleteRefund(refund)} className="refund-view-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RefundView;
