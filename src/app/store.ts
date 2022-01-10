import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import artistsReducer from "../features/artists/artistsSlice";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    artistsInfo: artistsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
