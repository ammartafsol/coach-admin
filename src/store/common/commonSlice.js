import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cms: {},

  notificationCount: 0,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setCMSData: (state, action) => {
      state.cms = action.payload;
    },
    setUnseenNotifications: (state, action) => {
      state.notificationCount = action.payload?.unseenIds?.length || 0;
    },
    addNotificationCount: (state) => {
      state.notificationCount += 1;
    },
  },
});

export const { setCMSData, setUnseenNotifications , addNotificationCount} = commonSlice.actions;
export default commonSlice.reducer;
