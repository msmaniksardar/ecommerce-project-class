import mongoose, {model} from 'mongoose'

const termsModelSchema = new mongoose.Schema({
    type: {type: String, required: true},
    des: {type: String, required: true},
}, {timestamps: true, versionKey: false,})

const termsModel = model('termsModel', termsModelSchema)

export default termsModel