const express = require('express');
const User = require('./models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Crew = require('./models/Crew');
const Flight = require('./models/Flight');
const Maintenance = require('./models/Maintenance');
const Booking = require('./models/Booking');

// this file contains all of the routes used for the different modules of the project

// Middleware for authenticating using JWT
function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, 'mySecret', (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }

        // Extract user role from JWT payload
        const { role } = user;

        req.user = user;

        // Check if the user is an admin or superadmin
        if (role === 'admin' || role === 'superadmin') {
            req.isAdmin = true;
        }

        next();
    });
}

// module.exports = { authenticate };

// Route accessible only to admins
router.get('/admin/dashboard', authenticate, (req, res) => {
    if (req.isAdmin) {
        res.json({ message: 'Admin dashboard accessible!' });
    } else {
        res.sendStatus(403);
    }
});


// Middleware for authenticating using JWT
function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, 'mySecret', (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~ 1.User Panel: ~~~~~~~~~~~~~~~~~~~~~~~

// registration:
router.post('/register', (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin
    });

    newUser.save().then((user) => {
        if (user) {
            console.log("user saved successfully!");
            res.json({ message: "user saved successfully!" });
        }
        else {
            console.log("user not saved!");
            res.json({ message: "user not saved!" });
        }
    });
});

// login with JWT-based authentication:
router.post('/login', (req, res) => {

    User.findOne({ username: req.body.username, password: req.body.password }).then((user) => {
        if (user) {
            if (user.blocked) {
                res.sendStatus({ message: "You are blocked!" });
            }
            const payload = { id: user.id, username: user.username, admin: user.admin };
            const options = { expiresIn: '1h' };
            const secret = 'mySecret';
            const token = jwt.sign(payload, secret, options);
            res.json({ token: token });
        }
        else {
            res.sendStatus(404);
        }
    });
});

// User profile retrieval

router.get('/user/:id', authenticate, (req, res) => {

    if (!req.user.admin) {
        return res.sendStatus(403);
    }

    User.findOne({ username: req.params.id }).then((user) => {
        if (user) {
            res.json(user);
        }
        else {
            res.sendStatus(404);
        }
    });
});

// User profile update:

router.put('/user/:id', authenticate, (req, res) => {

    User.findOne({ username: req.params.id }).then((user) => {
        if (user) {
            if (user.username != req.user.username && !req.user.admin) {
                console.log("You are not the owner of this blog!");
                return res.sendStatus(403);
            }
            user.username = req.body.username;
            user.email = req.body.email;
            user.password = req.body.password;
            user.save().then((user) => {
                if (user) {
                    console.log("user updated successfully!");
                    res.json({ message: "user updated successfully!" });
                }
                else {
                    console.log("user not updated!");
                    res.json({ message: "user not updated!" });
                }
            });
        }
        else {
            res.sendStatus(404);
        }
    });
});

// ~~~~~~~~~~~~~~~~~~~~~~~ 2.Admin Panel: ~~~~~~~~~~~~~~~~~~~~~~~


// ~~~~~~~~~~~~~~~~~~~~~~~ 3.Flight Management Panel: ~~~~~~~~~~~~~~~~~~~~~~~

// Flight routes
router.post('/flights', function (req, res) {
    // Add new flight
});

router.put('/flights/:id', function (req, res) {
    // Update flight information
});

router.delete('/flights/:id', function (req, res) {
    // Delete flight
});

router.get('/flights', function (req, res) {
    // View flight list
});

// Route routes
router.post('/routes', function (req, res) {
    // Add new route
});

router.put('/routes/:id', function (req, res) {
    // Update route information
});

router.delete('/routes/:id', function (req, res) {
    // Delete route
});

router.get('/routes', function (req, res) {
    // View route list
});

// Aircraft routes
router.post('/aircrafts', function (req, res) {
    // Add new aircraft
});

router.put('/aircrafts/:id', function (req, res) {
    // Update aircraft information
});

router.delete('/aircrafts/:id', function (req, res) {
    // Delete aircraft
});

router.get('/aircrafts', function (req, res) {
    // View aircraft list
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

router.get('/Booking/:paymentStatus', async (req, res) => {
    // get Payment history of all users
    try {
        const completedBookings = await Booking.find({ paymentStatus: 'completed' });

        res.json(completedBookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/*
    router.get('/feedback', async (req, res) => {

        needs a feedback schema, or retreival when feedback is implemented

    });

    router.get('/reports', async (req, res) => {

        needs a reports schema

    });


    UNSURE ABOUT ANALYTICS, what is crew analytics?
*/

module.exports = router;