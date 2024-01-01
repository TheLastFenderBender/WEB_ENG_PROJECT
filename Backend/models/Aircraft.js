const mongoose = require('mongoose');

const aircraftSchema = new mongoose.Schema({
    // aircraftID: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    // },
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

aircraftSchema.pre('save', async function (next) {
    if (!this._id) {
        try {
            const lastAircraft = await this.constructor.findOne({}, {}, { sort: { '_id': -1 } });
            this._id = lastAircraft ? lastAircraft._id + 1 : 1;
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
