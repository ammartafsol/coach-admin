import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    saveNotifications(state, action) {
        state.notifications = action.payload;
    },
    addNotification(state, action) {
      state.notifications.push(action.payload?.notification);
    },
  },
});

export const { saveNotifications, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;