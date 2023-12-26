import React, { useState, useEffect } from 'react';
import RefundUpdate from './RefundUpdate';
// import RefundDelete from './RefundDelete';

const RefundView = () => {
  const [refunds, setRefunds] = useState([]);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Fetch refund records from the backend API
    const fetchRefunds = async () => {
      try {
        const response = await fetch('YOUR_BACKEND_API_ENDPOINT/refunds');
        const data = await response.json();
        setRefunds(data);
      } catch (error) {
        console.error('Error fetching refunds:', error);
      }
    };

    fetchRefunds();
  }, []);

  const handleDeleteRefund = async (refund) => {
    try {
      const response = await fetch(`http://localhost:3000/deleteRefund/${refund._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful deletion
        console.log('User deleted successfully');
        setRefunds((prevUsers) => prevUsers.filter((refund) => refund._id !== refund));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleSubmit = async (refund) => {
    try {
      const response = await fetch(`ENDPOINT/updateRefund/${refund._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        console.log('Refund status updated successfully');
      } else {
        console.error('Failed to update refund status');
      }
    } catch (error) {
      console.error('Error updating refund status:', error);
    }
  };

  // const handleUpdate = (refundId) => {
  //   // Set the selected refund for update
  //   const selected = refunds.find((refund) => refund._id === refundId);
  //   setSelectedRefund(selected);
  // };

  const handleDelete = async (refundId) => {
    try {
      // Send a request to delete the refund record
      await fetch(`ENDPOINT/refunds/${refundId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Update the local state after deletion
      setRefunds((prevRefunds) => prevRefunds.filter((refund) => refund._id !== refundId));
    } catch (error) {
      console.error('Error deleting refund:', error);
    }
  };

  return (
    <div>
      <h4>Refund Records</h4>
      <table>
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
              <td>{refund.status}</td>
              <td>
                <select value={status} onChange={handleStatusChange}>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="denied">Denied</option>
                </select>
                <button onClick={handleSubmit}>Update Status</button>
                <button onClick={() => handleDeleteRefund(refund)}>Delete</button>
                

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render RefundUpdate component when a refund is selected for update */}
      {selectedRefund && <RefundUpdate refund={selectedRefund} />}
    </div>
  );
};

export default RefundView;
