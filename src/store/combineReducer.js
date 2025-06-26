import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import commonReducer from "./common/commonSlice";
import categoryReducer from "./category/categorySlice";

const rootReducer = combineReducers({
  authReducer,
  commonReducer,
  categoryReducer,
});

export default rootReducer;
