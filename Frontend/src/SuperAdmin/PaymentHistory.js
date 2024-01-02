import React, {useEffect, useState} from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/PaymentHistory.css';
import './SuperAdminStyles/SuperAdminPage.css';
import Axios from 'axios';

export default function PaymentHistory() {

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const paymentsResponse = await Axios.get("http://127.0.0.1:3000/paymenthistory");
                const paymentdata = paymentsResponse.data;
                setPayments(paymentdata);
                console.log(payments);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPayments();
    }, []);

    return (
        <>
            <NavBar></NavBar>
            <div className='SATitle'>
                <h1>Payment History</h1>
                <h3>View All Payments Made</h3>
            </div>
            <div className='paymentHContainer'>
                <table className='paymentHTable'>
                    <thead>
                        <tr>
                            <th>User No.</th>
                            <th>Name</th>
                            <th>Card Type</th>
                            <th>Card Number</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => (
                                <tr key={index}>
                                    <td>{payment.user}</td>
                                    <td>{payment.nameOnCard}</td>
                                    <td>{payment.cardType}</td>
                                    <td>{payment.cardNumber}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.timestamp}</td>
                                    <td>{payment.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}