import mongoose from 'mongoose';

const featuresModelSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
}, {timestamps: true, versionKey: false});

const FeaturesModel = mongoose.model('Features', featuresModelSchema);

export default FeaturesModel;