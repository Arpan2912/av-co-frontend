import { request, csvUploadRequest } from './request';
import { routes } from '../constants/constant.routes';

const API_URL = routes.API_URL;

export default class CompanyService {
  static addCompany(contactObj) {
    return request('POST', `${API_URL}${routes.ADD_COMPANY}`, null, contactObj, null)
  }

  static updateCompany(contactObj) {
    return request('POST', `${API_URL}${routes.UPDATE_COMPANY}`, null, contactObj, null)
  }

  static getCompany(search, body) {
    let qp = `?`;
    if (search) {
      qp += `search=${search}&`
    }
    return request('POST', `${API_URL}${routes.GET_COMPANIES}${qp}`, null, body, null)
  }
} 