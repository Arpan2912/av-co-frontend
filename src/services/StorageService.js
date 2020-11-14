export default class StorageService {
  static setToken(token) {
    localStorage.setItem("token", token);
  }

  static getToken() {
    return localStorage.getItem("token");
  }

  static removeToken() {
    return localStorage.removeItem("token");
  }

  static setUserDetail(detail) {
    const user = JSON.stringify(detail);
    localStorage.setItem("user", user);
  }

  static getUserDetail() {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
  }

  static removeUserDetail() {
    return localStorage.removeItem("user");
  }

  static setCompanyDetail(detail) {
    const user = JSON.stringify(detail);
    localStorage.setItem("company", user);
  }

  static getCompanyDetail() {
    const user = localStorage.getItem("company");
    return JSON.parse(user);
  }

  static removeCompanyDetail() {
    return localStorage.removeItem("company");
  }
}


