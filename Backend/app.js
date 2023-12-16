const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Airline', { useNewUrlParser: true });
mongoose.connection.once('open', () => { console.log('Connected to MongoDB Successfully') });


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

// Manually create an admin user if not exists
User.findOne({ username: 'admin' })
    .then(existingAdmin => {
        if (!existingAdmin) {
            const adminUser = new User({
                username: 'admin',
                email: 'admin@gmail.com',
                password: 'adminPassword',
                admin: true,
                blocked: false,
            });

            return adminUser.save();
        }
    })
    .then(() => {
        console.log('Admin user created or already exists');

        // Now, check if 'superadmin' exists
        return User.findOne({ username: 'superadmin' });
    })
    .then(existingSuperAdmin => {
        if (!existingSuperAdmin) {
            const superAdminUser = new User({
                username: 'superadmin',
                email: 'superadmin@gmail.com',
                password: 'superadminPassword',
                admin: true,
                blocked: false,
            });

            return superAdminUser.save();
        }
    })
    .then(() => {
        console.log('Superadmin user created or already exists');
    })
    .catch(error => {
        console.error('Error creating/admin checking users:', error);
    })
    .finally(() => {
        // Start your application after database setup
        app.listen(port, () => console.log(`Server is running on port: ${port}`));

    });
