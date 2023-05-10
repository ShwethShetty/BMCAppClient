import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import hostReducer from "./host/host.reducer";


const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "user",
    "host"
  ],
};

const rootReducer = combineReducers({
  user: userReducer,
  host: hostReducer
});

export default persistReducer(persistConfig, rootReducer);