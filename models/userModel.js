import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
    validate: {
      // This only works on CREATE and SAVE!
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

userSchema.pre("save", async function () {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return;

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm Field
  this.passwordConfirm = undefined;
});

export const User = mongoose.model("User", userSchema);
