import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
};

const userSchema = new Schema({
    name: {
        type: String,
        required: "User name required"
    },
    email: {
        type: String,
        required: 'Email required',
        unique: true
    },
    gender: String
}, schemaOptions);

export const Users = mongoose.model('users', userSchema);


