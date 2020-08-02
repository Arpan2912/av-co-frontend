import { request,csvUploadRequest } from './request';
import { routes } from '../constants/constant.routes';
import { objectToQuerystring } from '../utils';

const API_URL = routes.API_URL;

const { GET_STOCK_AND_AMT_WITH_DALAL, GET_ACCOUNT_SUMMARY } = routes;

export default class DashboardService {
  static getStockAndAmtWithDalal(obj) {
    const query = objectToQuerystring(obj);
    return request('GET', `${API_URL}${GET_STOCK_AND_AMT_WITH_DALAL}${query}`, null,null , null)
  }

  static getAccountSummary(obj) {
    const query = objectToQuerystring(obj);
    return request('GET', `${API_URL}${GET_ACCOUNT_SUMMARY}${query}`, null,null , null)
  }
}