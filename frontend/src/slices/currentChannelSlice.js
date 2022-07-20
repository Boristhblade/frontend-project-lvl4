/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannel: null,
};

const slice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setChannel(state, action) {
      const { id } = action.payload;
      state.currentChannel = id;
    },
  },
});

export const { setChannel } = slice.actions;
export default slice.reducer;
