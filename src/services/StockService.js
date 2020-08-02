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

  static getStocks(page, pageSize, search,isDownload,body) {
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
    return request('POST', `${API_URL}${routes.GET_STOCKS}${qp}`, null, body, null)
  }
} 