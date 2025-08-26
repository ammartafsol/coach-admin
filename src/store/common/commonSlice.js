import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationCount: 0,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setUnseenNotifications: (state, action) => {
      state.notificationCount = action.payload || 0;
    },
    addNotificationCount: (state) => {
      state.notificationCount += 1;
    },
    removeNotificationCount: (state) => {
      state.notificationCount -= 1;
    },
  },
});

export const { setCMSData, setUnseenNotifications, removeNotificationCount,addNotificationCount} = commonSlice.actions;
export default commonSlice.reducer;
