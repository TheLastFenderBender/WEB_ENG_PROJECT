import React, { useEffect, useState } from 'react';
import NavBar from './SuperAdminNavbar';
import './SuperAdminStyles/PaymentHistory.css';
import './SuperAdminStyles/SuperAdminPage.css';
import Axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
                <TableContainer component={Paper}>
                    <Table className='paymentHTable' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Card Type</TableCell>
                                <TableCell>Card Number</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                payments.map((payment, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{payment.nameOnCard}</TableCell>
                                        <TableCell>{payment.cardType}</TableCell>
                                        <TableCell>{payment.cardNumber}</TableCell>
                                        <TableCell>{payment.amount}</TableCell>
                                        <TableCell>{payment.timestamp.split('T')[0]}</TableCell>
                                        <TableCell>{payment.status}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}