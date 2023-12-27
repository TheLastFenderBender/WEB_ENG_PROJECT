import React, { useState } from 'react';
import './ProcessPayment.css'; // Import the CSS module

const ProcessPayment = () => {
  // State variable to store the payment amount
  const [paymentAmount, setPaymentAmount] = useState('');

  // Function to handle processing payment
  const handleProcessPayment = () => {
    // Log the payment amount to the console (replace with actual payment processing logic)
    console.log(`Processing payment of ${paymentAmount}`);
  };

  return (
    <div className="process-payment-container">
      {/* Payment processing section */}
      <h4 className="process-payment-heading">Process Payment</h4>
      <label className="process-payment-label">
        Payment Amount:
        {/* Input field for entering payment amount */}
        <input
          type="text"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          className="process-payment-input"
        />
      </label>
      {/* Button to trigger payment processing */}
      <button onClick={handleProcessPayment} className="process-payment-button">
        Process Payment
      </button>
    </div>
  );
};

export default ProcessPayment;
