import React, {useEffect, useState} from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/PaymentHistory.css';
import './SuperAdminStyles/SuperAdminPage.css';

export default function PaymentHistory() {

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const paymentsResponse = await fetch('/booking/history');
                const paymentData = await paymentsResponse.json();
                setPayments(paymentData);
            } catch (error) {
                console.error('Error fetching paymentshistory: ', error);
            }
        }

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
                    <th>
                        <td>User No.</td>
                        <td>Name</td>
                        <td>Card Type</td>
                        <td>Card Number</td>
                        <td>Amount</td>
                        <td>Date</td>
                        <td>Status</td>
                    </th>
                    {
                        payments.map((payment) => {
                            <tr>
                                <td>{payment.user}</td>
                                <td>{payment.nameOnCard}</td>
                                <td>{payment.cardType}</td>
                                <td>{payment.cardNumber}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.timestamp}</td>
                                <td>{payment.status}</td>
                            </tr>
                        })
                    }
                </table>
            </div>
        </>
    )
}