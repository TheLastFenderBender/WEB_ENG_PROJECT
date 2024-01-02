const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    flightAssignment: {
        type: String
    }
});

crewSchema.pre('validate', async function (next) {
    if (!this.id) {
        try {
            const lastCrew = await this.constructor.findOne({}, {}, { sort: { 'id': -1 } });
            this.id = lastCrew ? lastCrew.id + 1 : 1;
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
