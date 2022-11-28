import mongoose from "mongoose";
import { isEmail } from "validator";
import bcrypt from "bcrypt";
import { IUser } from "../types";
import { NextFunction } from "express";

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    lowercase: true
  },
  first_name: {
    type: String,
    required: [true, "Please enter your First name"],
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
    required: [true, "Please enter your Last name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  birthdate: {
    type: Date,
    required: [true, "Please enter your birthdate"],
    trim: true
  },
  gender: {
    type: String,
    required: [true, "Please select your gender"],
    enum: ["m", "f"]
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
    select: false
  },
  pokemonLineup: {
    type: []
  }
});

userSchema.pre('save', async function (next: NextFunction) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('findOneAndUpdate', async function (next: NextFunction) {
  try {
      //@ts-ignore
      if (this._update.password) {
        const salt = await bcrypt.genSalt();
        //@ts-ignore
        const hashed = await bcrypt.hash(this._update.password, salt)
        //@ts-ignore
        this._update.password = hashed;
      }
      next();
  } catch (err) {
      return next(err);
  }
});

// static method to login user
userSchema.statics.login = async function(email: string, password: string) {
  const user = await this.findOne({ email }).select("password");
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password")
  }
  throw Error("incorrect email");
}

const User = mongoose.model<IUser, any, { login: (email: string, password: string) => IUser | ErrorConstructor }>('user', userSchema);

export default User;