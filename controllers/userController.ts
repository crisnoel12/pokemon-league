import { Request, Response, NextFunction } from 'express';
import User from "../models/User";
import mongoose, { CallbackError } from "mongoose";
import { IUser } from '../types';
import ApiError from '../error/ApiError';

// handle errors
const handleErrors = (err: { [key: string]: any }) => {
  let errors: { [key: string]: any } = { username: '', first_name: '', middle_name: '', last_name: '', email: '', birthdate: '', gender: '', password: '' };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered"
  }
  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect"
  }
  // duplicate error code
  if (err.code === 11000) {
    if (err.message.includes('username')) {
      errors.username = 'That username is already taken'
    } else {
      errors.email = 'That email is already registered'
    }
  }

  // validation errors
  if (err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({ properties }: { [key: string]: any }) => {
      errors[properties.path] = properties.message;
    })
  }
  return errors;
}

export const GetUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find((err: CallbackError , users: IUser[]) => {
    if (err) {
      next(ApiError.internal('Something went wrong'));
      return;
    }
    res.json(users);
  })
}

export const GetSingleUser = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers;
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const id = mongoose.Types.ObjectId(req.params.id);
    User.findById(id, function (err: CallbackError, user: IUser) {
      if (err) {
        next(ApiError.internal('Something went wrong'));
        return;
      }
      if (!user) {
        next(ApiError.notFound('User not found'));
        return;
      }
      res.status(200).json(user);
    });
  } else {
    next(ApiError.notFound('User not found'));
    return;
  }
}

export const UpdateSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  // Remove falsy values in request body
  const newObj = {};
  Object.keys(req.body).forEach((k) => {
    if (req.body[k] != "" && req.body[k] != null && req.body[k] != undefined) {
      newObj[k] = req.body[k]
    }
  });

  // Update user
  User.findByIdAndUpdate(req.params.id, newObj, { new: true }, function (err: CallbackError, user: IUser) {
    if (err) {
      const errors = handleErrors(err);
      next(new ApiError(400, undefined, errors));
      return;
    }
    if (!user) {
      next(ApiError.notFound('User not found'));
      return;
    }
    res.status(200).json({ message: "User updated!", user });
  });
}