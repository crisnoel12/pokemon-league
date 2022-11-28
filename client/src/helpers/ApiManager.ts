import axios, { AxiosPromise, AxiosResponse } from "axios";
import { AUTHUSER, USER } from "../types";

const BASE_URL = "/api";

export class ApiManager {

  static signUp = async (signUpData: Partial<USER>) => {
    try {
      const response: AxiosResponse = await axios.post<AxiosPromise>(`${BASE_URL}/signup`, signUpData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static login = async (loginData: Partial<USER>) => {
    try {
      const response: AxiosResponse = await axios.post<AxiosPromise>(`${BASE_URL}/login`, loginData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static checkIsLoggedIn = async () => {
    try {
      const response: AxiosResponse = await axios.get<AxiosPromise>(`${BASE_URL}/is-logged-in`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static logout = async () => {
    try {
      const response: AxiosResponse = await axios.get<AxiosPromise>(`${BASE_URL}/logout`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static getCSRFToken = async () => {
    try {
      const response: AxiosResponse = await axios.get<AxiosPromise>(`${BASE_URL}/csrf-token`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static getProfile = async (id: AUTHUSER) => {
    try {
      const response: AxiosResponse = await axios.get<AxiosPromise>(`${BASE_URL}/user/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static updateProfile = async (authUser: AUTHUSER, obj: Partial<USER>) => {
    try {
      const response: AxiosResponse = await axios.patch<AxiosPromise>(`/api/user/${authUser}`, obj);
      return response;
    } catch (error) {
      throw error;
    }
  }

  static getTrainers = async () => {
    try {
      const response: AxiosResponse = await axios.get<AxiosPromise>(`${BASE_URL}/user`);
      return response;
    } catch (error) {
      throw error;
    }
  }

}