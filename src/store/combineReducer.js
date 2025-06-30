import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";
import commonReducer from "./common/commonSlice";
import categoryReducer from "./category/categorySlice";
//   import notificationReducer from "./notifications/notificationSlice";

const rootReducer = combineReducers({
  authReducer,
  commonReducer,
  category: categoryReducer, 
  // notificationReducer,
});

export default rootReducer;
