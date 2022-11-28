import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import ApiError from '../error/ApiError';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err: VerifyErrors) => {
      if (err) {
        next(new ApiError(401, err.message));
        return;
      } else {
        next();
      }
    });
  } else {
    return next(new ApiError(401, 'You are not authorized'));
  }
};

export { requireAuth };