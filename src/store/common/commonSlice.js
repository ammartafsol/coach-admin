import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationCount: 0,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setUnseenNotifications: (state, action) => {
      state.notificationCount = action.payload?.unSeenNotificationsCount || 0;
    },
    addNotificationCount: (state) => {
      console.log("addNotificationCount", state.notificationCount);
      state.notificationCount += 1;
    },
  },
});

export const { setCMSData, setUnseenNotifications , addNotificationCount} = commonSlice.actions;
export default commonSlice.reducer;
