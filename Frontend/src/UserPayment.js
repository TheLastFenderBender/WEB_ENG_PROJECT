import React, { useState } from 'react';
import UserNavbar from './UserNavbar';
import './UserPayment.css'; 
import { useNavigate } from 'react-router-dom';

const UserPayment = () => {
    const [cardDetails, setCardDetails] = useState({
        cardType: '',
        cardNumber: '',
        cardExpiry: '',
        cvv: '',
        nameOnCard: '',
        address: '',
        countryCode: '',
        city: '',
        agreeTerms: false,
    });

    const navigate = useNavigate();
    const cardTypeOptions = ['Visa', 'MasterCard', 'American Express', 'Discover'];
    const [paymentSuccess, setPaymentSuccess] = useState(false); // State to manage payment success pop-up

    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        setCardDetails((prevDetails) => ({
            ...prevDetails,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleGenerateInvoice = (invoiceDetails) => {
        // Logic to generate invoice
        // Logic to generate the invoice based on provided details
        // This could involve formatting the details, creating a PDF, etc.

        // For example, creating a simple invoice string
        const invoiceString = `
        Invoice Details:
        ---------------------------
        Name: ${invoiceDetails.name}
        Flight Number: ${invoiceDetails.flightNumber}
        Date: ${invoiceDetails.date}
        Total Amount: ${invoiceDetails.amount}
        // Add more details as needed
    `;

        const popup = document.createElement('div');
        popup.classList.add('invoice-popup');

        // Close button creation
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.classList.add('close-button');
        closeButton.addEventListener('click', () => {
            // Remove the invoice popup on close button click
            document.body.removeChild(popup);
        });
        popup.appendChild(closeButton);
        const invoiceText = document.createElement('textarea');
        invoiceText.value = invoiceString;
        invoiceText.setAttribute('readonly', true);
        invoiceText.classList.add('invoice-text');
        popup.appendChild(invoiceText);

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download Invoice';
        downloadButton.classList.add('download-button');
        downloadButton.addEventListener('click', () => {
            // Logic to download the invoice here
            // Replace this with your actual download logic
            // For example, creating a download link
            const invoiceBlob = new Blob([invoiceString], { type: 'text/plain' });
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(invoiceBlob);
            downloadLink.download = 'invoice.txt';
            downloadLink.click();
        });
        popup.appendChild(downloadButton);

        // Append the popup to the document body or any desired container
        document.body.appendChild(popup);
    };

    const handleConfirmPayment = () => {
        // Logic to confirm payment
        // Assuming payment confirmation, setting paymentSuccess to true
        setPaymentSuccess(true);

        // Simulating navigation after payment (replace this with actual navigation logic)
        setTimeout(() => {
            setPaymentSuccess(false); // Close the success pop-up after a delay
            
            navigate('/UserDashBoard');// Navigate to user dashboard here (use history.push or any navigation method you use)
            // For example: history.push('/userdashboard');
        }, 3000); // Close the pop-up after 3 seconds (adjust as needed)
    };

    return (
        <div>
            <UserNavbar />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>Payment</h2>
                <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                    
                    <h3>Select Your Preferred Payment Method</h3>
                    <div style={{ marginTop: '10px' }}>
                        {/* Dropdown for card type selection */}
                        <select
                            name="cardType"
                            value={cardDetails.cardType}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px' }}
                        >
                            <option value="">Select Card Type</option>
                            {cardTypeOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <hr />
                    <h3>Card Details</h3>
                    <div style={{ marginTop: '10px' }}>
                        <input
                            type="text"
                            placeholder="Card Number"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Card Expiry (MM/YYYY)"
                            name="cardExpiry"
                            value={cardDetails.cardExpiry}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="CVV/CVC"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Name on Card"
                            name="nameOnCard"
                            value={cardDetails.nameOnCard}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={cardDetails.address}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="Country Code"
                            name="countryCode"
                            value={cardDetails.countryCode}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            placeholder="City"
                            name="city"
                            value={cardDetails.city}
                            onChange={handleInputChange}
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={cardDetails.agreeTerms}
                                onChange={handleInputChange}
                            />
                            I agree to the Avio Airways Terms and Conditions of payment.
                        </label>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <a href="#" onClick={handleGenerateInvoice}>
                            Generate Invoice and Download
                        </a>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <button onClick={handleConfirmPayment}>Confirm Payment</button>
                    </div>
                    {/* Payment success pop-up */}
                    {paymentSuccess && (
                        <div className="payment-success-popup">
                            <p>Payment done successfully!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserPayment;
