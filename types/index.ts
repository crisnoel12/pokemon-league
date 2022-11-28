import { Document } from "mongoose";

interface IUser extends Document {
  username: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  email: string,
  birthdate: Date,
  gender: string,
  password: string,
  pokemonLineup: any[]
}

interface IError {
  status: number,
  message?: string,
  errors?: { [key: string]: any } // multiple error messages
}

export { IUser, IError };