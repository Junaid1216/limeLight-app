import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
};

const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState: initialState,
  reducers: {
    USER_DATA: (state, action) => {
      state.userData = action.payload;
    },
    UPDATE_USER_FIELD: (state, action) => {
      const { field, value } = action.payload;
      if (state.userData) {
        state.userData[field] = value;
      }
    },
    REMOVE_USER_DATA: state => {
      state.userData = null;
    },
  },
});

export default AuthSlice.reducer;
export const { USER_DATA, UPDATE_USER_FIELD, REMOVE_USER_DATA } =
  AuthSlice.actions;
