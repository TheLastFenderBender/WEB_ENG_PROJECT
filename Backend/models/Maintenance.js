const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    aircraftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aircraft',
        required: true,
    },
    scheduledDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['completed', 'pending'],
        default: 'pending',
    },
});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;
