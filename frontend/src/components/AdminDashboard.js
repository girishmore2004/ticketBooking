import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(''); // Track errors

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/pending');
        setPendingUsers(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load pending users');
        setLoading(false);
      }
    };
    fetchPendingUsers();
  }, []);

  const handleConfirm = async (id) => {
    try {
      // Confirm payment
      await axios.post(`http://localhost:5000/api/users/confirm/${id}`);

      // Generate ticket and send email with ticket
      await axios.post(`http://localhost:5000/api/users/generate-ticket/${id}`);

      alert('Payment confirmed and ticket sent!');
      
      // Update the UI to remove the confirmed user
      setPendingUsers(pendingUsers.filter(user => user._id !== id));
    } catch (err) {
      alert('Failed to confirm payment or send ticket.');
    }
  };

  const handleCancel = async (id) => {
    try {
      // Cancel payment and update user status
      await axios.post(`http://localhost:5000/api/users/cancel/${id}`);

      // Send email notifying user about payment not received
      await axios.post(`http://localhost:5000/api/users/send-cancellation-email/${id}`);

      alert('Payment canceled and email sent!');

      // Update the UI to remove the canceled user
      setPendingUsers(pendingUsers.filter(user => user._id !== id));
    } catch (err) {
      alert('Failed to cancel payment or send cancellation email.');
    }
  };

  return (
    <div
    style={{
      backgroundColor: "rgb(0, 0, 0)",  
      minHeight: "100vh",  
      color: "white",  
      paddingTop: "20px",  
    }}>
  <h2 className="text-center text-white mb-4">Pending Confirmation</h2>
 
  {loading ? (
    <div className="text-center text-white">Loading...</div>
  ) : error ? (
    <div className="text-center text-danger">{error}</div>
  ) : pendingUsers.length === 0 ? (
    <div className="text-center text-white">No pending confirmation</div>
  ) : (
    <div className="bg-dark p-4 rounded">
      {pendingUsers.map((user) => (
        <div key={user._id} className="mb-3">
          <div className="text-white">
            <p>Name: {user.name} </p>
            <p>Email: ({user.email})</p>
            <p>Mobile No: ({user.mobile})</p>
          </div>
          <div className="d-flex justify-content-start">
            <button 
              onClick={() => handleConfirm(user._id)} 
              className="btn btn-success me-2"
            >
              Confirm Payment
            </button>
            <button 
              onClick={() => handleCancel(user._id)} 
              className="btn btn-danger"
            >
              Cancel Payment
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

  );
};

export default AdminDashboard;
