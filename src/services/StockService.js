import { request,csvUploadRequest } from './request';
import { routes } from '../constants/constant.routes';

const API_URL = routes.API_URL;

export default class StockService {
  static addStock(contactObj) {
    return request('POST', `${API_URL}${routes.ADD_STOCK}`, null, contactObj, null)
  }

  static updateStock(contactObj) {
    return request('POST', `${API_URL}${routes.UPDATE_STOCK}`, null, contactObj, null)
  }

  static deleteStock(uuid) {
    let qp = `?`;
    if (uuid) {
      qp += `u=${uuid}&`
    }
    return request('DELETE', `${API_URL}${routes.DELETE_STOCKS}${qp}`, null, null, null)
  }

  static getStocks(page, pageSize, search,isDownload,body,status) {
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
    if (status) {
      qp += `status=${status}&`
    }
    if (isDownload) {
      qp += `downloadExcel=${isDownload}&`
    }
    return request('POST', `${API_URL}${routes.GET_STOCKS}${qp}`, null, body, null)
  }
} 