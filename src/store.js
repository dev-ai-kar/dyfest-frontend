import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  eventListReducer,
  eventDetailsReducer,
} from "./reducers/eventsReducers";

const reducer = combineReducers({
  eventList: eventListReducer,
  eventDetails: eventDetailsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
