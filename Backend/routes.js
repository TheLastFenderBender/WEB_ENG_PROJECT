const express = require('express');
const User = require('./models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Crew = require('./models/Crew');
const Refund = require('./models/Refund');
const Flight = require('./models/Flight');
const Maintenance = require('./models/Maintenance');
const Booking = require('./models/Booking');
const Feedback = require('./models/Feedback');
const Aircraft = require('./models/Aircraft');
const Route = require('./models/Route');
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const passwordSchema = new passwordValidator();
const mongoose = require('mongoose');
const Payment = require('./models/Payment');


// this file contains all of the routes used for the different modules of the project

// ~~~~~~~~~~~~~~~~~~~~~~~ 1.User Panel: ~~~~~~~~~~~~~~~~~~~~~~~

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
let AuthenticateUser = async (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Missing token' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(decoded.userId);

        if (!user || user.status === 'blocked') {
            return res.status(401).json({ message: 'Unauthorized - Invalid user or blocked' });
        }

        // Attach the decoded user information to the request for later use
        req.User = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized - Token expired' });
        }
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};


// Check role middleware
const checkRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.User && (req.User.role === requiredRole || (requiredRole === 'admin' && req.User.superadmin))) {
            next();
        } else {
            res.status(403).json({ message: 'Permission denied' });
        }
    };
};

passwordSchema
    .is().min(8)            // Minimum length 8
    .is().max(100)          // Maximum length 100
    .has().uppercase()      // Must have uppercase letters
    .has().lowercase()      // Must have lowercase letters
    .has().digits()         // Must have digits
    .has().not().spaces();   // Should not have spaces


router.post('/register', async (req, res) => {

    try {
        const { name, username, email, password, gender, age, mobileNumber, retypePassword, firstLetter } = req.body;

        // Validate user input
        if (!name || !username || !email || !password || !gender || !age || !mobileNumber || !retypePassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        console.log('Password:', password);
        console.log('Retype Password:', retypePassword);
        // Additional validation for password match
        if (password !== retypePassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Validate password against the schema
        if (!passwordSchema.validate(password)) {
            return res.status(400).json({ message: 'Password does not meet policy requirements' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Create a new user instance
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
            gender,
            age,
            mobileNumber,
            role: 'user',
            firstLetter,
        });

        // Save the user to the database
        await newUser.save();

        // Create a JWT token for the newly registered user
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.TOKEN_KEY,
            { expiresIn: '2h' }
        );

        res.status(201).json({
            user: newUser,
            userId: newUser.userId,
            token,
        });
    } catch (error) {
        console.error('MongoDB Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// login with JWT-based authentication
router.post('/login', async (req, res) => {
    console.log('inside log route');
    try {
        console.log('insidein try log route');

        const { email, password, role } = req.body;

        // Validate user input
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch || user.status === 'blocked') {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token for the authenticated user
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: role || user.role },
            process.env.TOKEN_KEY,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            user,
            token,
        });
    } catch (error) {
        console.error('MongoDB Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Profile Retrieval
router.get('/profile', AuthenticateUser, async (req, res) => {
    try {
        const userId = req.User.userId;
        const user = await User.findById(userId);

        if (!user || user.status === 'blocked') {
            return res.status(403).json({ message: 'Forbidden - User not found or blocked' });
        }

        let response;

        if (req.User.role === 'admin' || req.User.superadmin) {
            response = { user };
        } else {
            response = { user: { username: user.username, email: user.email, role: user.role } };
        }

        res.status(200).json(response);
    } catch (error) {
        console.error('MongoDB Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Profile Update
router.put('/profile', AuthenticateUser, checkRole('user'), async (req, res) => {
    try {
        const userId = req.User.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields based on the request body
        user.name = req.body.name || user.name;
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.gender = req.body.gender || user.gender;
        user.age = req.body.age || user.age;
        user.mobileNumber = req.body.mobileNumber || user.mobileNumber;

        // Only allow certain fields to be updated based on the user's role
        if (req.User.role === 'admin' || req.User.superadmin) {
            user.role = req.body.role || user.role;
            user.blocked = req.body.blocked || user.blocked;
        }

        await user.save();

        res.status(200).json({ user });
    } catch (error) {
        console.error('MongoDB Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Profile Retrieval by ID
router.get('/profile/:id', AuthenticateUser, checkRole('admin'), async (req, res) => {
    try {
        const userId = req.params.id; // Use the user ID from the route parameter
        const user = await User.findById(userId);

        if (!user || user.status === 'blocked') {
            return res.status(403).json({ message: 'Forbidden - User not found or blocked' });
        }

        let response;

        if (req.User.role === 'admin' || req.User.superadmin) {
            response = { user };
        } else {
            response = { user: { username: user.username, email: user.email, role: user.role } };
        }

        res.status(200).json(response);
    } catch (error) {
        console.error('MongoDB Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Profile Update by ID
router.put('/profile/:id', AuthenticateUser, checkRole('admin'), async (req, res) => {
    try {
        const userId = req.params.id; // Use the user ID from the route parameter
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields based on the request body
        user.name = req.body.name || user.name;
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.gender = req.body.gender || user.gender;
        user.age = req.body.age || user.age;
        user.mobileNumber = req.body.mobileNumber || user.mobileNumber;

        // Only allow certain fields to be updated based on the user's role
        if (req.User.role === 'admin') {
            user.role = req.body.role || user.role;
            user.blocked = req.body.blocked || user.blocked;
        }

        await user.save();

        res.status(200).json({ user });
    } catch (error) {
        console.error('MongoDB Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route accessible only to admins
router.get('/admin/dashboard', AuthenticateUser, (req, res) => {
    if (req.isAdmin) {
        res.json({ message: 'Admin dashboard accessible!' });
    } else {
        res.sendStatus(403);
    }
});

router.get('/flights/search', async (req, res) => {
    try {
        const { departure, arrival, date } = req.query;

        // console.log('Received parameters:', departure, arrival, date);
        // Ensure that all parameters are present before performing the search
        if (!departure || !arrival || !date) {
            return res.status(400).json({ message: 'Missing search parameters' });
        }

        // const searchDate = new Date(date);
        // Perform the search based on the provided parameters
        const flights = await Flight.find({
            departure,
            arrival,
            date: new Date(date),
            // date: { $gte: searchDate, $lt: new Date(searchDate.getTime() + 24 * 60 * 60 * 1000) }, 
        });

        console.log('Received parameters:', departure, arrival, date);

        // Return the matched flights
        res.json({ flights });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// change this to /user/flights...
router.get('/flights/:flightNumber', async (req, res) => {
    const { flightNumber } = req.params;

    try {
        console.log('Fetching flight with flightNumber:', flightNumber);
        const flight = await Flight.findOne({ flightNumber });

        console.log('Flight found:', flight);
        if (!flight) {
            console.log('Flight not found');
            return res.status(404).json({ message: 'Flight not found' });
        }

        res.json(flight);
    } catch (error) {
        console.error('Error fetching flight:', error);
        res.status(500).json({ message: 'Error fetching flight', error: error.message });
    }
});

// Route to handle submitting feedback
router.post('/feedback', async (req, res) => {
    try {
        const { description, rating, userID, flightNumber } = req.body;
        // const { description, fromUser, bookingId, rating } = req.body;

        console.log('Received data:', req.body);

        // Create a new feedback instance using the Feedback model
        const newFeedback = new Feedback({
            description,
            rating,
            userID,
            flightNumber,
        });

        await newFeedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Feedback Submission
router.post('/bookings/:bookingId/feedback', async (req, res) => {
    const { bookingId } = req.params;
    const { description, rating, userID, flightNumber } = req.body;

    try {
        // Create feedback for a specific booking
        const newFeedback = await Feedback({
            bookingId,
            description,
            rating,
            userID,
            flightNumber,
        });
        await newFeedback.save();
        res.status(201).json(newFeedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// router.post('/bookings/:bookingId/feedback', async (req, res) => {
//     const { bookingId } = req.params;
//     const { description, userID, flightNumber, rating } = req.body;

//     try {
//         const newFeedback = await Feedback.create({
//             bookingId,
//             description,
//             rating,
//             userID,
//             flightNumber,
//         });

//         res.status(201).json(newFeedback);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


router.get('/routes/:routeID', async (req, res) => {
    const { routeID } = req.params;

    try {
        const route = await Route.findOne({ routeID });
        console.log('routeid: ', routeID);
        console.log('route: ', route);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        return res.status(200).json(route);
    } catch (error) {
        console.error('Error fetching route:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

// // Endpoint to get user details by ID
// router.get('/users/:userId', async (req, res) => {
//     try {
//         // const userId = req.params.userId;

//         const userId = parseInt(req.params.userId);
//         // console.log('userid: ', userId);
//         // Assuming your User model has a method to find a user by ID
//         const user = await User.findOne({ userId: userId });
//         // console.log('userid: ', userId);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Modify this response to fit your user data structure
//         res.status(200).json({
//             userId: userId,
//             username: user.username,
//         });
//     } catch (error) {
//         console.error('Error fetching user details:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Route to get flight details by flight ID
// router.get('/flights/:flightNumber', async (req, res) => {
//     const { flightNumber } = req.params;

//     try {
//         // const isValidObjectId = mongoose.Types.ObjectId.isValid(flightNumber);
//         // if (!isValidObjectId) {
//         //     console.log('Invalid flight ID format');
//         //     return res.status(400).json({ message: 'Invalid flight ID format' });
//         // }

//         console.log('Fetching flight with ID:', flightNumber);
//         const flight = await Flight.findById(flightNumber);
//         console.log('Flight found:', flight);
//         if (!flight) {
//             console.log('Flight not found');
//             return res.status(404).json({ message: 'Flight not found' });
//         }

//         res.json(flight);
//     } catch (error) {
//         console.error('Error fetching flight:', error);
//         res.status(500).json({ message: 'Error fetching flight', error: error.message });
//     }
// });


// Function to get the correct price based on flight class
const getFlightPrice = (flightClass, prices) => {
    return flightClass === 'economy' ? prices.economy : prices.business;
};


// Route to create a new booking
router.post('/bookflight', async (req, res) => {
    try {
        // Extract necessary data from the request body
        const { userId, flightNumber, seatNumber } = req.body;
        const userDetails = await User.findOne({ userId: userId });
        const flightDetails = await Flight.findOne({ flightNumber: flightNumber });



        // Create a new booking using the Booking model
        const newBooking = await Booking.create({
            userId: userDetails.userId, // Assuming userId is the unique identifier for User
            flightNumber: flightDetails.flightNumber,
            seatNumber,
            flightDetails: {
                airline: flightDetails.airline,
                departure: flightDetails.departure,
                arrival: flightDetails.arrival,
                aircraftID: flightDetails.aircraftID,
                routeID: flightDetails.routeID,
                date: flightDetails.date,
                time: flightDetails.time,
                duration: flightDetails.duration,
                availableSeats: flightDetails.availableSeats,
                price: getFlightPrice(flightDetails.flightClass, flightDetails.prices),
            },
        });
        // Generate the booking number
        const lastBooking = await Booking.findOne({}, {}, { sort: { 'bookingNumber': -1 } });
        const bookingNumber = lastBooking ? lastBooking.bookingNumber + 1 : 1;

        // Update the booking with the generated booking number
        newBooking.bookingNumber = bookingNumber;

        // Decrease the available seats count in the Flight model
        await Flight.findOneAndUpdate(
            { flightNumber },
            { $inc: { availableSeats: -1 } }, // Reduce available seats count by 1
            { new: true }
        );

        // Respond with the newly created booking
        res.status(201).json({ booking: newBooking, bookingNumber });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not book the flight' });
    }
});

// Express route handler to update booking with refund details
router.post('/bookings/refund/:userId', async (req, res) => {
    const { userId } = req.params;
    const {
        refundedAmount,
        refundMethod,
        comment,
        reason,
        refundStatus,
        // paymentStatus,
    } = req.body;

    try {
        // Save refund details to the Refund model
        const newRefund = new Refund({
            userId,
            refundedAmount,
            refundMethod,
            comment,
            reason,
            refundStatus,
        });

        // Save the new refund data to the database
        const savedRefund = await newRefund.save();

        res.status(201).json({ savedRefund, message: 'Refund details saved successfully' });

        // res.status(201).json(savedRefund);
        // res.json({ message: 'Refund details saved successfully' });

    } catch (error) {
        console.error('Error saving refund data:', error);
    }
    // res.status(500).json({ error: 'Failed to save refund details' });
});

// Update payment status route
router.patch('/bookings/:bookingNumber/refundPay', async (req, res) => {
    const { bookingNumber } = req.params;

    try {
        const updatedBooking = await Booking.findOneAndUpdate(
            { bookingNumber },
            { paymentStatus: 'refunded' }, // Update payment status to 'refunded'
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Payment status updated to refunded', booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


// Route to fetch booking details based on bookingNumber
router.get('/bookings/:bookingNumber', async (req, res) => {
    try {
        const { bookingNumber } = req.params;

        // Find the booking details using the Booking model
        const bookingDetails = await Booking.findOne({ bookingNumber });

        if (!bookingDetails) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json(bookingDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not fetch booking details' });
    }
});

// Route to fetch bookings made by a specific user
router.get('/bookings/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Find all bookings associated with the provided userId
        const userBookings = await Booking.find({ userId });

        if (!userBookings || userBookings.length === 0) {
            return res.status(404).json({ error: 'No bookings found for this user' });
        }

        res.status(200).json(userBookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not fetch user bookings' });
    }
});


//     try {
//         // Find bookings based on the provided userId
//         const bookings = await Booking.find({ userId: parseInt(userId, 10) }).populate('flightId');
//         res.json(bookings);
//     } catch (error) {
//         console.error('Error fetching bookings:', error);
//         res.status(500).json({ error: 'Failed to fetch bookings' });
//     }
// });
// Route to update booking status and payment status
router.put('/bookings/:bookingNumber', async (req, res) => {
    const { bookingNumber } = req.params;

    try {
        // Find the booking based on the booking number
        const booking = await Booking.findOne({ bookingNumber });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Update booking status and payment status
        booking.bookingStatus = 'confirmed';
        booking.paymentStatus = 'completed';

        // Save the updated booking details
        await booking.save();

        res.status(200).json({ message: 'Booking status and payment status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update booking status and payment status' });
    }
});

// Route to store payment details
router.post('/storepayment', async (req, res) => {
    try {
        const {
            cardType,
            cardNumber,
            cardExpiry,
            cvv,
            nameOnCard,
            // Other payment details you want to store in the database
        } = req.body;


        // Retrieve booking details based on bookingNumber
        const booking = await Booking.findOne({ bookingNumber: req.body.bookingNumber });


        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Extract payment amount from booking details
        const paymentAmount = booking.flightDetails.price;


        // Create a new instance of your Payment model
        const newPayment = new Payment({
            cardType,
            cardNumber,
            cardExpiry,
            cvv,
            nameOnCard,
            amount: paymentAmount, // Assign the payment amount from the booking
            status: 'completed',
        });

        // Save the payment details to the database
        await newPayment.save();

        res.status(201).json({ message: 'Payment details stored successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to store payment details' });
    }
});

router.get('/Users/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const user = await User.findOne({ userId: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return all relevant user information
        res.status(200).json({
            userId: user.userId,
            name: user.name,
            username: user.username,
            email: user.email,
            age: user.age,
            gender: user.gender,
            mobileNumber: user.mobileNumber,
            nationality: user.nationality,
            passportNumber: user.passportNumber,
            passportExpiry: user.passportExpiry,
            // Add any other necessary fields here
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route to update user password by userId
router.put('/users/:userId/changePassword', async (req, res) => {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    try {
        // Find the user by userId
        const user = await User.findOne({ userId: userId });

        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        // Compare hashed oldPassword with the stored hashed password
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password with the hashed new password
        user.password = hashedNewPassword;
        await user.save();

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to update travel document info by userId
router.put('/users/:userId/addTravelInfo', async (req, res) => {
    const { userId } = req.params;
    const { nationality, passportNumber, passportExpiry } = req.body;

    try {
        const user = await User.findOne({ userId: userId });


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's travel document information
        user.nationality = nationality;
        user.passportNumber = passportNumber;
        user.passportExpiry = passportExpiry;

        // Save the updated user data
        await user.save();

        return res.status(200).json({ message: 'Travel document information updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE route to delete a user by ID
router.delete('/users/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const userToDelete = await User.findOneAndDelete({ userId: userId });

        if (!userToDelete) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



//===========================
// Cancel Booking
router.delete('/bookings/:bookingNumber', async (req, res) => {
    const { bookingNumber } = req.params;
    try {
        // Delete the specific booking by ID
        await Booking.findByIdAndDelete(bookingNumber);
        res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Cancel Booking
router.delete('/bookings/:bookingNumber', async (req, res) => {
    const { bookingNumber } = req.params;
    try {
        // Delete the specific booking by bookingNumber
        const deletedBooking = await Booking.findOneAndDelete({ bookingNumber });
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/bookings/:bookingNumber/cancel', async (req, res) => {
    const { bookingNumber } = req.params;
    const { bookingStatus } = req.body;
    console.log(bookingStatus);

    try {
        // Find the booking in the database and update its status to 'cancelled'
        const booking = await Booking.findOne({ bookingNumber: bookingNumber });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.bookingStatus = bookingStatus;

        await booking.save();
        // If the booking was successfully updated, respond with a success message and the updated booking
        return res.status(200).json({ message: 'Booking cancelled successfully', booking });
    } catch (error) {
        return res.status(500).json({ message: 'Error cancelling booking', error: error.message });
    }
});

// // Express Route for cancelling a booking
// router.put('/bookings/:bookingNumber', async (req, res) => {
//     const { bookingNumber } = req.params;

//     try {
//         // Find the booking in the database and update its status to 'cancelled'
//         const booking = await Booking.findOneAndUpdate(
//             { bookingNumber },
//             { bookingStatus: 'cancelled' },
//             { new: true } // To return the updated booking after the update
//         );

//         if (!booking) {
//             return res.status(404).json({ message: 'Booking not found' });
//         }

//         // If the booking was successfully updated, respond with a success message
//         return res.status(200).json({ message: 'Booking cancelled successfully', booking });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error cancelling booking', error: error.message });
//     }
// });




// ~~~~~~~~~~~~~~~~~~~~~~~ 2.Admin Panel: ~~~~~~~~~~~~~~~~~~~~~~~

// GET route to retrieve all users
router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find({}); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE route to delete a user by ID
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // Find the user by ID and delete
        const deletedUser = await User.findByIdAndDelete(id);
        console.log(deletedUser);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT route to update user information
router.put('/updateUser/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
        // Find the user by ID and update their information
        const updatedUser = await User.findByIdAndUpdate(id,
            updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// PATCH route to update the payment status of a booking
router.patch('/updateBooking/:id', async (req, res) => {
    const bookingId = req.params.id;
    const { paymentStatus } = req.body;

    try {
        // Find the booking by ID and update its payment status
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { $set: { paymentStatus, updatedAt: new Date() } },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to generate a report for all bookings
router.get('/generate-report', async (req, res) => {
    try {
        // Fetch all booking records from the database
        const allBookings = await Booking.find();

        // Transform the data as needed for the report
        const reportData = allBookings.map((booking) => {
            return {
                bookingId: booking._id,
                userId: booking.userId,
                flightId: booking.flightId,
                seatNumber: booking.seatNumber,
                bookingStatus: booking.status,
                paymentStatus: booking.paymentStatus,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt,
                // Add additional fields as needed
            };
        });

        // Respond with the generated report data
        res.json(reportData);
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// PATCH route to update the status of a refund request
router.patch('/updateRefund/:refundId', async (req, res) => {
    const refundId = req.params.refundId;
    const { refundStatus } = req.body;

    try {
        // Validate refundStatus
        if (!['Processed', 'Pending', 'Failed'].includes(refundStatus)) {
            return res.status(400).json({ message: 'Invalid refund status' });
        }

        // Find the refund request by ID and update its status
        const updatedRefund = await Refund.findByIdAndUpdate(
            refundId,
            { $set: { refundStatus, updatedAt: new Date() } },
            { new: true }
        );

        if (!updatedRefund) {
            return res.status(404).json({ message: 'Refund request not found' });
        }

        res.status(200).json(updatedRefund);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// GET route to retrieve all refund requests
router.get('/getRefunds', async (req, res) => {
    try {
        // Fetch all refund requests
        const allRefunds = await Refund.find();

        res.status(200).json(allRefunds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE route to delete a refund request by ID
router.delete('/deleteRefund/:refundId', async (req, res) => {
    const refundId = req.params.refundId;

    try {
        // Find the refund request by ID and delete
        const deletedRefund = await Refund.findByIdAndDelete(refundId);

        if (!deletedRefund) {
            return res.status(404).json({ message: 'Refund request not found' });
        }

        res.status(200).json({ message: 'Refund request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/getAdminBookings', async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/AdminBookings/:bookingId', async (req, res) => {
    const bookingId = req.params.bookingId;
    try {
        // Find the booking based on the booking number
        const booking = await Booking.findOne({ _id: bookingId });
        console.log(booking);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Update booking status and payment status
        booking.bookingStatus = 'confirmed';
        booking.paymentStatus = 'completed';

        // Save the updated booking details
        await booking.save();

        res.status(200).json({ message: 'Booking status and payment status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update booking status and payment status' });
    }
});

// update the seat number of the use
router.put('/updateBookingSeatAdmin/:bookingId', async (req, res) => {
    const bookingId = req.params.bookingId;
    const { seatNumber } = req.body;

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { seatNumber: seatNumber },
            { new: true }  // This option returns the document after update was applied
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// ~~~~~~~~~~~~~~~~~~~~~~~ 3.Flight Management Panel: ~~~~~~~~~~~~~~~~~~~~~~~

// Flight routes
router.post('/flights', async (req, res) => {
    const { airline, aircraftID, routeID, departure, arrival, date, time, availableSeats, flightType, flightClass, prices, status } = req.body;

    try {
        const aircraftExists = await Aircraft.findOne({ aircraftID: aircraftID });
        if (!aircraftExists) {
            return res.status(400).json({ message: 'Aircraft not found' });
        } else if (aircraftExists.active === true) {
            return res.status(400).json({ message: 'Aircraft is already active' });
        }

        const routeExists = await Route.findOne({ routeID: routeID });
        if (!routeExists) {
            return res.status(400).json({ message: 'Route not found' });
        } else if (routeExists.active === true) {
            return res.status(400).json({ message: 'Route is already active' });
        }

        const newFlight = new Flight({
            airline,
            aircraftID,
            routeID,
            departure,
            arrival,
            date,
            time,
            availableSeats,
            flightType,
            flightClass,
            prices,
            status
        });
        const savedFlight = await newFlight.save();

        aircraftExists.active = true;
        await aircraftExists.save();

        routeExists.active = true;
        await routeExists.save();

        res.status(201).json(savedFlight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/flights/:id', async (req, res) => {
    const { id } = req.params;
    const { airline, aircraftID, routeID, departure, arrival, date, time, availableSeats, flightType, flightClass, prices, status } = req.body;

    try {
        const existingFlight = await Flight.findOne({ flightNumber: id });
        if (!existingFlight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        const aircraftExists = await Aircraft.findOne({ aircraftID: aircraftID });
        if (!aircraftExists) {
            return res.status(400).json({ message: 'Aircraft not found' });
        }

        const routeExists = await Route.findOne({ routeID: routeID });
        if (!routeExists) {
            return res.status(400).json({ message: 'Route not found' });
        }

        existingFlight.airline = airline;
        existingFlight.aircraftID = aircraftID;
        existingFlight.routeID = routeID;
        existingFlight.departure = departure;
        existingFlight.arrival = arrival;
        existingFlight.date = date;
        existingFlight.time = time;
        existingFlight.availableSeats = availableSeats;
        existingFlight.flightType = flightType;
        existingFlight.flightClass = flightClass;
        existingFlight.prices = prices;
        existingFlight.status = status;

        const updatedFlight = await existingFlight.save();
        res.json(updatedFlight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/flights/:id', async (req, res) => {
    const { id } = req.params;

    const flight = await Flight.findOne({ flightNumber: id });
    const { aircraftID, routeID, flightType, flightClass, prices, status } = flight;

    const aircraft = await Aircraft.findOne({ aircraftID: aircraftID });
    aircraft.active = false;
    await aircraft.save();

    const route = await Route.findOne({ routeID: routeID });
    route.active = false;
    await route.save();

    try {
        await Flight.deleteOne({ flightNumber: id });
        res.json({ message: 'Flight deleted', deletedFlight: { flightType, flightClass, prices, status } });
    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get all Flights:
router.get('/flights', async (req, res) => {
    try {
        const allFlights = await Flight.find();
        res.json(allFlights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single Flight:
router.get('/flights/:id', async (req, res) => {
    const { id } = req.params; d
    try {
        const flight = await Flight.findOne({ flightNumber: id });
        res.json(flight);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route routes
router.post('/routes', async (req, res) => {
    // Add new route
    const { departure, arrival, distance, travelTime } = req.body;

    try {
        const newRoute = new Route({
            departure,
            arrival,
            distance,
            travelTime,
        });

        const savedRoute = await newRoute.save();
        console.log('savedRoute:', savedRoute);
        res.status(201).json(savedRoute);
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: error.message });
    }

});

router.put('/routes/:id', async (req, res) => {
    // Update route information
    const { id } = req.params;
    const { departure, arrival, distance, travelTime } = req.body;

    try {
        // Check if the route exists
        const existingRoute = await Route.findOne({ routeID: id });
        if (!existingRoute) {
            return res.status(404).json({ message: 'Route not found' });
        }

        // Update the route details
        existingRoute.departure = departure;
        existingRoute.arrival = arrival;
        existingRoute.distance = distance;
        existingRoute.travelTime = travelTime;

        const updatedRoute = await existingRoute.save();
        res.json(updatedRoute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/routes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Route.deleteOne({ routeID: id });
        res.json({ message: 'Route deleted' });
    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get all Routes:
router.get('/routes', async (req, res) => {
    try {
        const allRoutes = await Route.find();
        res.json(allRoutes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single Route:
router.get('/routes/:id', async (req, res) => {
    const { id } = req.params; d
    try {
        const route = await Route.findOne({ routeID: id });
        res.json(route);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Aircraft routes
router.post('/aircrafts', async (req, res) => {
    // Add new aircraft

    const { model, capacity } = req.body;

    try {
        const newAircraft = new Aircraft({
            model,
            capacity,
        });

        const savedAircraft = await newAircraft.save();
        res.status(201).json(savedAircraft);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/aircrafts/:id', async (req, res) => {
    // Update aircraft information
    const { id } = req.params;
    const { model, capacity } = req.body;

    try {
        // Check if the aircraft exists
        const existingAircraft = await Aircraft.findOne({ aircraftID: id });
        if (!existingAircraft) {
            return res.status(404).json({ message: 'Aircraft not found' });
        }

        // Update the aircraft details
        existingAircraft.model = model;
        existingAircraft.capacity = capacity;

        const updatedAircraft = await existingAircraft.save();
        res.json(updatedAircraft);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }


});

router.delete('/aircrafts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Aircraft.deleteOne({ aircraftID: id });
        res.json({ message: 'Aircraft deleted' });
    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Get all Aircrafts:
router.get('/aircrafts', async (req, res) => {
    try {
        const allAircrafts = await Aircraft.find();
        res.json(allAircrafts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single Aircraft:
router.get('/aircrafts/:id', async (req, res) => {
    const { id } = req.params
    try {
        const aircrafts = await Aircraft.findOne({ aircraftID: id });
        res.json(aircrafts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// ~~~~~~~~~~~~~~~~~~~~~~~ 4.Super Admin Panel: ~~~~~~~~~~~~~~~~~~~~~~~


// Crew C.R.U.D. Routes

router.get('/crew', async (req, res) => {
    // Get all crew members
    try {
        const crewMembers = await Crew.find();
        res.json(crewMembers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/crew', async (req, res) => {
    // Add new crew member
    const { name, position, flightAssignment } = req.body;

    const flight = await Flight.findOne({ flightNumber: flightAssignment })
    if (!flight) {
        return res.status(400).json({ message: 'Flight not found' });
    }

    try {
        const newCrewMember = new Crew({
            name,
            position,
            flightAssignment,
        });

        const savedCrewMember = await newCrewMember.save();
        res.status(201).json(savedCrewMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/crew/:id', async (req, res) => {
    // Update a crew member
    const { id } = req.params;
    const { name, position, flightAssignment } = req.body;

    try {
        const updatedCrewMember = await Crew.findOne(id);

        if (!updatedCrewMember) {
            return res.status(404).json({ message: 'Crew member not found' });
        }

        updatedCrewMember.name = name;
        updatedCrewMember.position = position;
        updatedCrewMember.flightAssignment = flightAssignment;

        await updatedCrewMember.save();
        res.json(updatedCrewMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/crew/:id', async (req, res) => {
    // Delete crew member
    const { id } = req.params;

    try {
        const deletedCrewMember = await Crew.deleteOne(id)

        if (!deletedCrewMember) {
            return res.status(404).json({ message: 'Crew member not found' });
        }

        res.json({ message: 'Crew member deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Aircraft Maintenance Routes

router.get('/maintenance', async (req, res) => {
    // Maintenance history, get all maintenance issued
    try {
        const allMaintenance = await Maintenance.find();
        res.json(allMaintenance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/maintenance/:id', async (req, res) => {
    // Update details of a specfic maintenance scheduled
    const { id } = req.params;
    const { aircraftId, scheduledDate, description, status } = req.body;

    try {
        const existingMaintenance = await Maintenance.findOne(id);

        if (!existingMaintenance) {
            return res.status(404).json({ message: 'Maintenance not found' });
        }
        if (existingMaintenance.status !== 'pending') {
            return res.status(400).json({ message: 'Cannot update maintenance with status other than pending' });
        }

        const aircraftExists = await Flight.findById(aircraftId);
        if (!aircraftExists) {
            return res.status(400).json({ message: 'Aircraft not found' });
        }

        existingMaintenance.aircraftId = aircraftId;
        existingMaintenance.scheduledDate = scheduledDate;
        existingMaintenance.description = description;
        existingMaintenance.status = status;

        const updatedMaintenance = await existingMaintenance.save();
        res.json(updatedMaintenance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.post('/maintenance', async (req, res) => {
    /*
        Assumed that Add maintenance and Schedule maintenance are both done here
        Maintenance information will also include its schedule date
        This route covers both the maintenance being created and scheduled
    */
    const { aircraftID, scheduledDate, description } = req.body;

    try {
        // Check if the aircraftId exists
        const aircraftExists = await Aircraft.findOne(aircraftID);
        if (!aircraftExists) {
            return res.status(400).json({ message: 'Aircraft not found' });
        }

        const newMaintenance = new Maintenance({
            aircraftID,
            scheduledDate,
            description,
        });

        const savedMaintenance = await newMaintenance.save();
        res.status(201).json(savedMaintenance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/maintenance/:id', async (req, res) => {
    // Remove a maintenance that has been issued/pending only
    const { id } = req.params;

    try {
        const maintenanceToDelete = await Maintenance.deleteOne(id);

        if (!maintenanceToDelete) {
            return res.status(404).json({ message: 'Maintenance not found' });
        }

        if (maintenanceToDelete.status === 'completed') {
            return res.status(400).json({ message: 'Cannot delete completed maintenance' });
        }

        const deletedMaintenance = await Maintenance.findByIdAndDelete(id);

        if (!deletedMaintenance) {
            return res.status(404).json({ message: 'Maintenance not found' });
        }

        res.json({ message: 'Maintenance deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Report and Analytics Routes
router.get('/flighthistory', async (req, res) => {
    /*
        Shows flight history
        Done by sending flights that have date before current date
    */
    try {
        const currentDate = new Date();

        const flightHistory = await Flight.find({
            date: { $lt: currentDate }
        });

        res.json(flightHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/paymenthistory', async (req, res) => {
    // get Payment history of all users
    try {
        const completedPayments = await Payment.find();
        console.log(completedPayments);
        res.json(completedPayments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/feedback', async (req, res) => {
    // get all feedback
    try {
        const allFeedback = await Feedback.find();

        res.json(allFeedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});
/*


    router.get('/reports', async (req, res) => {

        needs a reports schema

    });


    UNSURE ABOUT ANALYTICS, what is crew analytics?
*/

module.exports = router;