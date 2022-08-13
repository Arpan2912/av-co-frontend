import { createSlice } from '@reduxjs/toolkit'

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    header: null,
  },
  reducers: {
    updateHeaderMenus: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.header = action.payload
    },
    updateCompanyDetail: (state, action) => {
      state.companyDetail = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateHeaderMenus, updateCompanyDetail } = headerSlice.actions

export default headerSlice.reducer