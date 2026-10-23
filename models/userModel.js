import mongoose from "mongoose";
import validator from "validator";

// name, email, photo, password, passwordConfirm

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    unique: true,
    trim: true,
    maxlength: [250, "A user's name must not exceed 250 characters"],
    minlength: [0, "A user's name must not be lower than 0 characters"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email address"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "A user must have a password"],
    trim: true,
    maxlength: [12, "password must not exceed 12 characters"],
    minlength: [6, "password must be more than or equals to 6 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
  },
});

export const User = mongoose.model("User", userSchema);
