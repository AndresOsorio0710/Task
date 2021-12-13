import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunck from "redux-thunk";
import taskReducer from "./taskDucks";

const rootReducer = combineReducers({
  tasks: taskReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunck))
  );
  return store;
}
