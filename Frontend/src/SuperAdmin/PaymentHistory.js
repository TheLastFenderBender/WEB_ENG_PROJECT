import React, {useEffect, useState} from 'react';
import NavBar from './SuperAdminNavbar';

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

            </div>
        </>
    )
}