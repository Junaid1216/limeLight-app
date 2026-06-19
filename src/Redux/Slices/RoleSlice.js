import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
};

const RoleSlice = createSlice({
  name: 'RoleSlice',
  initialState: initialState,
  reducers: {
    ROLE_DATA: (state, action) => {
      state.userData = action.payload;
    },
    REMOVE_ROLE_DATA: state => {
      state.userData = null;
    },
  },
});

export default RoleSlice.reducer;
export const { ROLE_DATA, REMOVE_ROLE_DATA } = RoleSlice.actions;
