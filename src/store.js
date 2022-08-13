import { applyMiddleware, compose } from "redux";
import { createSlice, configureStore } from '@reduxjs/toolkit'
import reducer from "./redux-slices/reducers";
// import reducer from "./reducer"
import thunk from "redux-thunk";

const customMiddleWare = store => next => action => {
  console.log("Middleware triggered:", action);
  next(action);
}

const middleware = [customMiddleWare];

const store = configureStore({
  reducer: reducer,
  middleware: middleware,
});

// create custom middle ware for thunk




// const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose

// const store = configureStore(
//     reducer,
//     initialState,
//     composeEnhancers(
//         applyMiddleware(...middleware)
//         // ,
//         // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

export default store;