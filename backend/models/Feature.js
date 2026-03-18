const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema(
    {
        Image: String,    
    },
    { timestamps: true }
)

module.exports = mongoose.model('Feature', FeatureSchema);