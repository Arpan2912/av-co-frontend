import { request,csvUploadRequest } from './request';
import { routes } from '../constants/constant.routes';
const {
  ADD_OPENING_BALANCE,
  UPDATE_OPENING_BALANCE,
  GET_TODAY_OPENING_BALANCE
} = routes;

const API_URL = routes.API_URL;

export default class OpeningBalanceService {
  static addOpeningBalance(obj) {
    return request('POST', `${API_URL}${ADD_OPENING_BALANCE}`, null, obj, null)
  }

  static updateOpeningBalance(obj) {
    return request('POST', `${API_URL}${UPDATE_OPENING_BALANCE}`, null, obj, null)
  }

  static getTodayOpeningBalance(obj) {
    return request('GET', `${API_URL}${GET_TODAY_OPENING_BALANCE}`, null, null, null)
  }
}
