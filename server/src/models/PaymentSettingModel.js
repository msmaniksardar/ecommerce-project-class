import mongoose from 'mongoose';

const PaymentSettingSchema = new mongoose.Schema({
    storeId: {type: String, required: true},
    storePassword: {type: String, required: true},
    currency: {type: String, required: true},
    successUrl: {type: String, required: true},
    failureUrl: {type: String, required: true},
    cancelUrl: {type: String, required: true},
    ipnUrl: {type: String, required: true},
    initUrl: {type: String, required: true},
}, {timestamps: true, versionKey: false,});

const PaymentSetting = mongoose.model('PaymentSetting', PaymentSettingSchema);

export default PaymentSetting;