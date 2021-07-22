import { configureStore } from '@reduxjs/toolkit';

import { configurableComponentsSlice } from './comfigurableComponentsSlice';

export default configureStore({
  reducer: {
    configurableComponents: configurableComponentsSlice.reducer
  }
})