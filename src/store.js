import { createStore, applyMiddleware,compose } from "redux";
import reducer from "./reducer"
import thunk from "redux-thunk";

const initialState = {};

// create custom middle ware for thunk
const customMiddleWare = store => next => action => {
    console.log("Middleware triggered:", action);
    next(action);
}

const middleware = [thunk,customMiddleWare];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
        applyMiddleware(...middleware)
        // ,
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;