import { request,csvUploadRequest } from './request';
import { routes } from '../constants/constant.routes';

const API_URL = routes.API_URL;

export default class TransactionService {
  static addTransaction(contactObj) {
    return request('POST', `${API_URL}${routes.ADD_TRANSACTION}`, null, contactObj, null)
  }

  static updateTransaction(contactObj) {
    return request('POST', `${API_URL}${routes.UPDATE_TRANSACTION}`, null, contactObj, null)
  }

  static getTransactions(page, pageSize, search,isDownload,body,personId,mode) {
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
    if (mode) {
      qp += `mode=${mode}&`
    }
    if (isDownload) {
      qp += `downloadExcel=${isDownload}&`
    }
    if (personId) {
      qp += `u=${personId}&`
    }
    return request('POST', `${API_URL}${routes.GET_TRANSACTIONS}${qp}`, null, body, null)
  }

  static getCloseAmountToday() {
    return request('GET', `${API_URL}${routes.GET_CLOSE_AMOUNT_TODAY}`, null, null, null)
  }
} 