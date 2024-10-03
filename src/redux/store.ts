import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// apis
import usersApi from "./services/usersApi";
import permissionsApi from "./services/permissionsApi";
import rolesApi from "./services/rolesApi";
import registerationReducer from "./features/registerationSlice";
import storeTypesApi from "./services/common/storeType";

import ordersApi from "./services/ordersApi";
import locationApi from "./services/locationApi";
import authApi from "./services/authApi";
import bankApi from "./services/bankApi";
import productApi from "./services/productApi";
import placesapi from "./services/placesApi";
import dashboardApi from "./services/dashboardApi";
import countriesApi from "./services/common/countries";
import citiesApi from "./services/common/cities";
import notificationSlice from "./features/notificationSlice";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registerationReducer,
    notification: notificationSlice,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [permissionsApi.reducerPath]: permissionsApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [storeTypesApi.reducerPath]: storeTypesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [bankApi.reducerPath]: bankApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [placesapi.reducerPath]: placesapi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [citiesApi.reducerPath]: citiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      usersApi.middleware,
      permissionsApi.middleware,
      rolesApi.middleware,
      storeTypesApi.middleware,
      ordersApi.middleware,
      locationApi.middleware,
      locationApi.middleware,
      bankApi.middleware,
      productApi.middleware,
      placesapi.middleware,
      dashboardApi.middleware,
      countriesApi.middleware,
      citiesApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
