const express = require('express');
const User = require('./models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Crew = require('./models/Crew');
const Flight = require('./models/Flight');
const Maintenance = require('./models/Maintenance');
const Booking = require('./models/Booking');
const Feedback = require('./models/Feedback');
const Aircraft = require('./models/Aircraft');
const Route = require('./models/Route');
const passwordValidator = require('password-validator');
const bcrypt = require('bcrypt');
const passwordSchema = new passwordValidator();

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
            token,
        });
    } catch (error) {
        console.error('MongoDB Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// login with JWT-based authentication
router.post('/login', async (req, res) => {
    try {
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
        const { origin, destination, departureDate } = req.query;
        // const { origin, destination, departureDate, returnDate, flightClass } = req.query;

        // Ensure that all parameters are present before performing the search
        if (!origin || !destination || !departureDate) {
            return res.status(400).json({ message: 'Missing search parameters' });
        }

        // Perform the search based on the provided parameters
        const flights = await Flight.find({
            departure: origin,
            arrival: destination,
            date: new Date(departureDate),
        
            // returnDate,
            // flightClass,
        });

        // Add optional parameters if they exist
        // if (returnDate) {
        //     query.returnDate = new Date(returnDate);
        // }
        // if (flightClass) {
        //     query.flightClass = flightClass;
        // }

        // const flights = await Flight.find(query);

        // Return the matched flights
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new route to book a flight
router.post('/bookflight', async (req, res) => {
    // Logic to handle booking the selected flight(s)
    // Receive the details of the flight the user is trying to book
    // Perform necessary operations like storing the booking information in the database
});

// Route for booking a flight
router.post('/flights/book', async (req, res) => {
    try {
        const { userId, flightId, seatNumber } = req.body;

        // Validate if all necessary fields are present
        if (!userId || !flightId || !seatNumber) {
            return res.status(400).json({ message: 'Missing booking parameters' });
        }

        // Create a new booking
        const newBooking = new Booking({
            userId,
            flightId,
            seatNumber,
            status: 'booked', // Default status is booked
            paymentStatus: 'pending', // Default payment status is pending
            // You can include createdAt and updatedAt timestamps here if needed
        });

        // Save the booking to the database
        await newBooking.save();

        res.status(201).json({ message: 'Flight booked successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



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
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

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
      const { status } = req.body;
  
      try {
          // Validate status
          if (!['pending', 'approved', 'denied'].includes(status)) {
              return res.status(400).json({ message: 'Invalid status' });
          }
  
          // Find the refund request by ID and update its status
          const updatedRefund = await Refund.findByIdAndUpdate(
              refundId, 
              { $set: { status, updatedAt: new Date() } }, 
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

// ~~~~~~~~~~~~~~~~~~~~~~~ 3.Flight Management Panel: ~~~~~~~~~~~~~~~~~~~~~~~

// Flight routes
router.post('/flights', async (req, res) => {
    // Add new flight
    const { flightNumber, airline, aircraftID, departure, arrival, date, time, availableSeats } = req.body;

    try {
        // Check if the aircraftID exists
        const aircraftExists = await Aircraft.findOne({ aircraftID: aircraftID });
        if (!aircraftExists) {
            //alert('Aircraft not found');
            return res.status(400).json({ message: 'Aircraft not found' });
        }
        else if (aircraftExists.active === false) {
            // alert('Aircraft is not active');
            return res.status(400).json({ message: 'Aircraft is not active' });
        }

        const newFlight = new Flight({
            flightNumber,
            airline,
            aircraftID,
            departure,
            arrival,
            date,
            time,
            availableSeats,
        });
        const savedFlight = await newFlight.save();
        alert('Flight added successfully');
        res.status(201).json(savedFlight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

router.put('/flights/:id', async (req, res) => {
    // Update flight information

    const { id } = req.params;
    const { flightNumber, airline, aircraftID, routeID, departure, arrival, date, time, availableSeats } = req.body;

    try {
        // Check if the flight exists
        const existingFlight = await Flight.findOne({flightNumber: id});
        if (!existingFlight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        // Check if the aircraftID exists
        const aircraftExists = await Aircraft.findOne({aircraftID: aircraftID});
        if (!aircraftExists) {
            return res.status(400).json({ message: 'Aircraft not found' });
        }

        const routeExists = await Route.findOne({ routeID: routeID });
        if (!routeExists) {
            return res.status(400).json({ message: 'Route not found' });
        }

        // Update the flight details
        existingFlight.flightNumber = flightNumber;
        existingFlight.airline = airline;
        existingFlight.aircraftID = aircraftID;
        existingFlight.routeID = routeID;
        existingFlight.departure = departure;
        existingFlight.arrival = arrival;
        existingFlight.date = date;
        existingFlight.time = time;
        existingFlight.availableSeats = availableSeats;

        const updatedFlight = await existingFlight.save();
        res.json(updatedFlight);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/flights/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Flight.deleteOne({flightNumber: id});
        res.json({ message: 'Flight deleted' });
    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/flights', async (req, res) => {
    try {
        const allFlights = await Flight.find();
        res.json(allFlights);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route routes
router.post('/routes', async (req, res) => {
    // Add new route
    const { routeID, departure, arrival, distance, travelTime } = req.body;

    try {
        const newRoute = new Route({
            routeID,
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
    const { routeID, departure, arrival, distance, travelTime } = req.body;

    try {
        // Check if the route exists
        const existingRoute = await Route.findOne({ routeID: id });
        if (!existingRoute) {
            alert('Route not found');
            return res.status(404).json({ message: 'Route not found' });
        }

        // Update the route details
        existingRoute.routeID = routeID;
        existingRoute.departure = departure;
        existingRoute.arrival = arrival;
        existingRoute.distance = distance;
        existingRoute.travelTime = travelTime;

        const updatedRoute = await existingRoute.save();
        alert('Route updated successfully');
        res.json(updatedRoute);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/routes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Route.deleteOne({routeID: id});
        res.json({ message: 'Route deleted' });
    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/routes', async (req, res) => {
    try {
        const allRoutes = await Route.find();
        res.json(allRoutes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Aircraft routes
router.post('/aircrafts', async (req, res) => {
    // Add new aircraft

    const { aircraftID, model, capacity, active } = req.body;

    try {
        const newAircraft = new Aircraft({
            aircraftID,
            model,
            capacity,
            active,
        });

        const savedAircraft = await newAircraft.save();
        alert('Aircraft added successfully');
        res.status(201).json(savedAircraft);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/aircrafts/:id', async (req, res) => {
    // Update aircraft information
    const { id } = req.params;
    const { aircraftID, model, capacity, active } = req.body;

    try {
        // Check if the aircraft exists
        const existingAircraft = await Aircraft.findOne({ aircraftID: id });
        if (!existingAircraft) {
            alert('Aircraft not found');
            return res.status(404).json({ message: 'Aircraft not found' });
        }

        // Update the aircraft details
        existingAircraft.aircraftID = aircraftID;
        existingAircraft.model = model;
        existingAircraft.capacity = capacity;
        existingAircraft.active = active;

        const updatedAircraft = await existingAircraft.save();
        res.json(updatedAircraft);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    

});

router.delete('/aircrafts/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Aircraft.deleteOne({aircraftID: id});
        res.json({ message: 'Aircraft deleted' });
    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/aircrafts', async (req, res) => {
    try {
        const allAircrafts = await Aircraft.find();
        res.json(allAircrafts);
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
    const { name, position, flightAssignments } = req.body;

    try {
        const newCrewMember = new Crew({
            name,
            position,
            flightAssignments,
        });

        const savedCrewMember = await newCrewMember.save();
        res.status(201).json(savedCrewMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/crew/:name', async (req, res) => {
    // Update a crew member
    // name can be updated to id, need to change in schema
    const { name } = req.params;
    const { position, flightAssignments } = req.body;

    try {
        const updatedCrewMember = await Crew.findOneAndUpdate(
            { name },
            { position, flightAssignments },
            { new: true }
        );

        if (!updatedCrewMember) {
            return res.status(404).json({ message: 'Crew member not found' });
        }

        res.json(updatedCrewMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.put('/crew/:name/flightAssignments', async (req, res) => {
    // Update of flightAssignments only
    const { name } = req.params;
    const { flightAssignments } = req.body;

    try {
        const updatedCrewMember = await Crew.findOneAndUpdate(
            { name },
            { flightAssignments },
            { new: true }
        );

        if (!updatedCrewMember) {
            return res.status(404).json({ message: 'Crew member not found' });
        }

        res.json(updatedCrewMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/crew/:name', async (req, res) => {
    // Delete crew member
    // name can be updated to id, need to change in schema
    const { name } = req.params;

    try {
        const deletedCrewMember = await Crew.findOneAndDelete({ name });

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

router.get('/maintenance', async (req, res) => {
    // Maintenance Schedule, Maintenance that is "PENDING"
    try {
        const pendingMaintenanceList = await Maintenance.find({ status: 'pending' });

        res.json(pendingMaintenanceList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/maintenance/:id', async (req, res) => {
    // Update details of a specfic maintenance scheduled
    const { id } = req.params;
    const { aircraftId, scheduledDate, description, status } = req.body;

    try {
        // Check if the maintenance exists
        const existingMaintenance = await Maintenance.findById(id);

        if (!existingMaintenance) {
            return res.status(404).json({ message: 'Maintenance not found' });
        }

        // Check if the maintenance is in 'pending' status
        if (existingMaintenance.status !== 'pending') {
            return res.status(400).json({ message: 'Cannot update maintenance with status other than pending' });
        }

        // Check if the aircraftId exists
        const aircraftExists = await Flight.findById(aircraftId);
        if (!aircraftExists) {
            return res.status(400).json({ message: 'Aircraft not found' });
        }

        // Update the maintenance details
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
    const { aircraftId, scheduledDate, description, status } = req.body;

    try {
        // Check if the aircraftId exists
        const aircraftExists = await Flight.findById(aircraftId);
        if (!aircraftExists) {
            return res.status(400).json({ message: 'Aircraft not found' });
        }

        const newMaintenance = new Maintenance({
            aircraftId,
            scheduledDate,
            description,
            status,
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
        const maintenanceToDelete = await Maintenance.findById(id);

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
router.get('/flights', async (req, res) => {
    /*
        Shows flight history
        Done by sending flights that have date before current date
        Can be improved by showing only flights that have Date + flight duration
        before the current date
    */
    try {
        const currentDate = new Date();

        const flightHistory = await Flight.find({
            date: { $lt: currentDate },
        });

        res.json(flightHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/booking/:paymentStatus', async (req, res) => {
    // get Payment history of all users
    try {
        const completedBookings = await Booking.find({ paymentStatus: 'completed' });

        res.json(completedBookings);
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

// counting routes for superadminpage
router.get('/crew/count', async (req, res) => {
    try {
        const crewCount = await Crew.countDocuments();
        res.json({ count: crewCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/maintenance/count', async (req, res) => {
    try {
        const maintenanceCount = await Maintenance.countDocuments();
        res.json({ count: maintenanceCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/flights/count', async (req, res) => {
    try {
        const flightCount = await Flight.countDocuments();
        res.json({ count: flightCount });
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