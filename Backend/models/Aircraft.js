const mongoose = require('mongoose');

const aircraftSchema = new mongoose.Schema({
    aircraftID: {
        type: Number,
        required: true,
        unique: true,
    },
    model: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    }
});

aircraftSchema.pre('validate', async function (next) {
    if (!this.aircraftID) {
        try {
            const lastAircraft = await this.constructor.findOne({}, {}, { sort: { 'aircraftID': -1 } });
            this.aircraftID = lastAircraft ? lastAircraft.aircraftID + 1 : 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Aircraft = mongoose.model('Aircraft', aircraftSchema);

module.exports = Aircraft;
