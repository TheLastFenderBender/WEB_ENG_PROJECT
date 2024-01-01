const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    // routeID: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
    departure: {
        type: String,
        required: true,
    },
    arrival: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    travelTime: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    }
});

routeSchema.pre('save', async function (next) {
    if (!this._id) {
        try {
            const lastRoute = await this.constructor.findOne({}, {}, { sort: { '_id': -1 } });
            this._id = lastRoute ? lastRoute._id + 1 : 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;
