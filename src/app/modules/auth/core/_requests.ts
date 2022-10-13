import axios from 'axios'
import {AuthModel} from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}sos_api/v1/admin/verify_token`
export const LOGIN_URL = `${API_URL}sos_api/v1/admin/login`
export const REGISTER_URL = `${API_URL}sos_api/v1/admin/register`
export const REQUEST_PASSWORD_URL = `${API_URL}admin/forgot_password`
export const UPDATE_PROFILE_URL = `${API_URL}sos_api/v1/admin/updateProfile`



console.log(UPDATE_PROFILE_URL);

// Server should return AuthModel
export function login(email: string, password: string) {
  //console.log("Login.............", email , password);
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  })  
}

// Server should return AuthModel
export function register(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  mobile:string
) {
  //console.log("register........",email,firstName,lastName,password);
  
  return axios.post(REGISTER_URL, {
    email,
    firstName,
    lastName,
    password,
    mobile
  })
}

export function updateProfile(
  //email: string,
  firstName: string,
  lastName: string,
  phoneNumber:String,
  image:string
  // password: string,
  // phoneNumber:string,
) {
  console.log("update........",image);
  return axios.post<AuthModel>(UPDATE_PROFILE_URL, {
    //email,
    firstName,
    lastName,
    // password,
    phoneNumber,
    image
    
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  //console.log("this get user By token.....",token); 
  return axios.post<AuthModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    token: token,  
  })
}



