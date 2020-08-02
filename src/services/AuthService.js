import { request } from './request';
import { routes } from '../constants/constant.routes';
const API_URL = routes.API_URL;

export default class AuthService {
  static signin(userObj) {
    return request('POST', `${API_URL}${routes.SIGNIN}`, null, userObj, null)
  }
} 