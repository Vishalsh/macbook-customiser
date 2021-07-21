import { createSlice } from '@reduxjs/toolkit'

export const configurableComponentsSlice = createSlice({
  name: 'configurableComponents',
  initialState: {
    data: {},
    loading: false,
    error: null
  },
  reducers: {
    inProgress: (state) => ({
      ...state,
      loading: true,
    }),
    successful: (state, action) => ({
      ...state,
      loading: false,
      data: action.payload  
    }),
    failed: (state) => ({
      ...state,
      loading: false,
      error: null
    })
  }
})

export const { inProgress, successful, failed } = configurableComponentsSlice.actions;
