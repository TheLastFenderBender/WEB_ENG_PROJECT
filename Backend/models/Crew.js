const mongoose = require('mongoose');

const crewSchema = new mongoose.Schema({
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

const Crew = mongoose.model('Crew', crewSchema);

module.exports = Crew;
