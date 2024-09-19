import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { qrdriveAllSlice } from "../components/api/slices/qrdriveAllSlice";
import { payStationSlice } from "../components/api/slices/payStattionApiSlice";

export const store = configureStore({
  reducer: {
    [qrdriveAllSlice.reducerPath]: qrdriveAllSlice.reducer,
    [payStationSlice.reducerPath]: payStationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      qrdriveAllSlice.middleware,
      payStationSlice.middleware,
    ),
});

setupListeners(store.dispatch);
