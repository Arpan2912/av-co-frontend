import axios from 'axios';
import qs from 'qs';
import Storage from './StorageService';
/**
 * request interceptors
 * @param {String} method GET,PUT,POST,DELETE
 * @param {String} url req url
 * @param {Object} params query parameters
 * @param {Object} body req body
 * @param {Object} headers req headers
 */
export const request = (method, url, params, body = {}, headers = {}) => {
  headers = headers || {};
  params = params || {};
  body = body || {};
  const companyDetail = Storage.getCompanyDetail();
  let companyId = null;
  if (companyDetail) {
    companyId = companyDetail.uuid
    headers['company-id'] = companyId;
  }
  if (!headers['content-type']) {
    headers['content-type'] = 'application/json';
  }
  if (!(url === 'signin' || url === 'signup' || url === 'forgot-password')) {
    const token = Storage.getToken();
    headers.Authorization = `Bearer ${token}`;
    // headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1X3V1aWQiOiJkNjhiYjU3Zi0zOGY0LTQxOGUtYmIzNy0yMzJmOGQzMDg3MDciLCJmaXJzdF9uYW1lIjoibmlrdW5qIiwibGFzdF9uYW1lIjoiUHJhIiwiZW1haWwiOiJuaWt1bmpAbWFpbGluYXRvci5jb20iLCJmYklkIjpudWxsLCJpZCI6NCwidXNlclR5cGUiOjIsImlhdCI6MTUzMTg5NjMzNH0.g2cvqz_CeBWfaBkAwQwe5B-wy-iM2QlTruF27APva6Q';
  }
  const options = {
    method,
    headers,
    params,
    url,
  };

  if ((method === 'POST' || method === 'PUT') && headers['content-type'] === 'application/x-www-form-urlencoded') {
    options.data = qs.stringify(body);
  } else if ((method === 'POST' || method === 'PUT') && headers['content-type'] === 'multipart/form-data') {
    headers['content-type'] = 'multipart/form-data';

    // prepate multipart formdata body 
    const formData = new FormData();
    const keys = Object.keys(body);
    for (let i = 0; i < keys.length; i++) {
      formData.append(keys[i], body[keys[i]]);
    }
    options.data = formData;
    // options.data = qs.stringify(body);
  } else if ((method === 'POST' || method === 'PUT')) {
    options.data = body;
  }

  return axios(options);
};


export const csvUploadRequest = (url, file) => {
  let formData = new FormData();
  formData.append('csv', file, file.name);
  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${Storage.getToken()}`
    }
  })
}
