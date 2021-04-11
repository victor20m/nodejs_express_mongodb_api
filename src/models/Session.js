import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const SessionSchema = new Schema({
  user_email: {
    type: String,
    required: true,
  },
  auth_token: {
    type: String,
    required: true,
    unique: true
  },
  login_date: {
      type: Date,
      default: Date.now
  },
  expiration_date: {
    type: Date,
    required: true
  }
});

export default model('Session', SessionSchema);