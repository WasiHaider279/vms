import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegistrationState {
  data: Record<string, any> | null;
}

function safeGetItem(key: string): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
}

function safeSetItem(key: string, value: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
}

function safeRemoveItem(key: string): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}

const initialState: RegistrationState = {
  data: safeGetItem("registration")
    ? JSON.parse(safeGetItem("registration")!)
    : null,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setRegistration: (state, action: PayloadAction<Record<string, any>>) => {
      state.data = { ...state.data, ...action.payload };
      safeSetItem("registration", JSON.stringify(state.data));
    },
    removeRegistration: (state) => {
      state.data = null;
      safeRemoveItem("registration");
    },
  },
});

export const { setRegistration, removeRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;
