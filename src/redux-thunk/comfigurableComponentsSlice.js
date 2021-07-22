import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCustomisableComponents } from '../service'

export const fetchConfigurableComponents = createAsyncThunk('configurableComponents', async () => {
  const response = await getCustomisableComponents();
  return response;
})

export const configurableComponentsSlice = createSlice({
  name: 'configurableComponents',
  initialState: {
    data: {},
    loading: false,
    error: null
  },
  reducers: {
    setConfigurableComponents: (state, action) => ({
      ...state,
      data: action.payload
    }),
  },
  extraReducers: {
    [fetchConfigurableComponents.pending]: (state) => ({
      ...state,
      loading: true,
    }),
    [fetchConfigurableComponents.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
      data: action.payload
    }),
    [fetchConfigurableComponents.rejected]: (state) => ({
      ...state,
      loading: false,
      error: null
    })
  },
})

export const { setConfigurableComponents } = configurableComponentsSlice.actions;