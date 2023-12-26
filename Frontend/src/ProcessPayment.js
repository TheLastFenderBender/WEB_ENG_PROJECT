import React, { useState } from 'react';

const ProcessPayment = () => {
  const [paymentAmount, setPaymentAmount] = useState('');

  const handleProcessPayment = () => {
    console.log(`Processing payment of ${paymentAmount}`);
  };

  return (
    <div>
      <h4>Process Payment</h4>
      <label>
        Payment Amount:
        <input
          type="text"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
        />
      </label>
      <button onClick={handleProcessPayment}>Process Payment</button>
    </div>
  );
};

export default ProcessPayment;
