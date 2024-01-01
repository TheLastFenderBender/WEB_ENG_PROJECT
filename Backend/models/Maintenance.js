const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    // id: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
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

maintenanceSchema.pre('save', async function (next) {
    if (!this._id) {
        try {
            const lastMaintenance = await this.constructor.findOne({}, {}, { sort: { '_id': -1 } });
            this._id = lastMaintenance ? lastMaintenance._id + 1 : 1;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;
