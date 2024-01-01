const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    flightAssignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
    }],
});

crewSchema.pre('validate', async function (next) {
    if (!this._id) {
        try {
            const lastCrew = await this.constructor.findOne({}, {}, { sort: { '_id': -1 } });
            this._id = lastCrew ? lastCrew._id + 1 : 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Crew = mongoose.model('Crew', crewSchema);

module.exports = Crew;
