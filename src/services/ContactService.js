import { request,csvUploadRequest } from './request';
import { routes } from '../constants/constant.routes';

const API_URL = routes.API_URL;

export default class ContactService {
  static addContact(contactObj) {
    return request('POST', `${API_URL}${routes.ADD_CONTACT}`, null, contactObj, null)
  }

  static updateContact(contactObj) {
    return request('POST', `${API_URL}${routes.UPDATE_CONTACT}`, null, contactObj, null)
  }

  static getContacts(page, pageSize, search,isDownload,body) {
    let qp = `?`;
    if (page) {
      qp += `page=${page}&`
    }
    if (pageSize) {
      qp += `limit=${pageSize}&`
    }
    if (search) {
      qp += `search=${search}&`
    }
    if (isDownload) {
      qp += `downloadExcel=${isDownload}&`
    }
    return request('POST', `${API_URL}${routes.GET_CONTACTS}${qp}`, null, body, null)
  }

  static uploadExcel(file) {
    let url = `${API_URL}${routes.UPLOAD_EXCEL}`;
    return csvUploadRequest(url, file);
  }
} 