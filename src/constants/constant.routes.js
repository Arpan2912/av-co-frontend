module.exports = {
  routes: {
    API_URL:'http://localhost:3001/',

    SIGNIN: 'auth/signin',
    SIGNUP: 'auth/signup',

    ADD_CONTACT: 'contact/add-contact',
    UPDATE_CONTACT: 'contact/update-contact',
  GET_CONTACTS: 'contact/get-contacts',
    UPLOAD_EXCEL:'contact/upload-excel',

    ADD_STOCK: 'stock/add-stock',
    UPDATE_STOCK: 'stock/update-stock',
    GET_STOCKS: 'stock/get-stocks',
    
    ADD_TRANSACTION: 'transaction/add-transaction',
    UPDATE_TRANSACTION: 'transaction/update-transaction',
    GET_TRANSACTIONS: 'transaction/get-transactions',
    GET_CLOSE_AMOUNT_TODAY: 'transaction/get-close-amount-today',

    ADD_OPENING_BALANCE: 'opening-balance/add-opening-balance',
    UPDATE_OPENING_BALANCE: 'opening-balance/update-opening-balance',
    GET_TODAY_OPENING_BALANCE: 'opening-balance/get-today-opening-balance',

    GET_STOCK_AND_AMT_WITH_DALAL: 'dashboard/get-stock-and-amount-with-dalal',
    GET_ACCOUNT_SUMMARY:'dashboard/get-account-summary'
  }
}