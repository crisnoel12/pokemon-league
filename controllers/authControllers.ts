import User from '../models/User';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
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

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  })
}

export const SignupPostController = async (req: Request, res: Response, next: NextFunction) => {
  const { username, first_name, middle_name, last_name, email, gender, birthdate, password } = req.body;
  try {
    const user = await User.create({
      username, first_name, middle_name, last_name, email, gender, birthdate, password
    });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err: any) {
    const errorObj = handleErrors(err);
    next(ApiError.badRequest(undefined, errorObj));
    return;
  }
}

export const LoginPostController = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);;
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, token });
  } catch (err: any) {
    const errorObj = handleErrors(err);
    next(ApiError.badRequest(undefined, errorObj));
    return;
  }
}

export const LogoutController = (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.status(204).send();
};

export const IsLoggedInController = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err: VerifyErrors | null, decodedToken: { [key: string]: any }) => {
      if (err) {
        res.clearCookie('jwt');
        const errorObj = { [err.name]: { message: err.message}};
        next(ApiError.badRequest(undefined, errorObj));
        return;
      } else {
        let user = await User.findById(decodedToken.id);
        res.status(200).json({ user: user._id });
      }
    });
  } else {
    res.status(200).json({ user: null });
  }
}
