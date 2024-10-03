import { EncryptString } from "@/utils/string-encription";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  token: string;
  status: string;
}

const initialState: AuthState = {
  token: Cookies.get("token") || "",
  status: Cookies.get("status") || "",
};

interface SetAuthTokenPayload {
  token: string;
  status: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<SetAuthTokenPayload>) => {
      state.token = action.payload.token;
      state.status = action.payload.status;
      Cookies.set("token", action.payload.token, { expires: 30 });
      Cookies.set(
        "status",
        EncryptString({ stringToEncrypt: action.payload.status }),
        { expires: 30 }
      );
    },
    removeAuthToken: (state) => {
      state.token = "";
      state.status = "";
      Cookies.remove("token");
      Cookies.remove("status");
    },
  },
});

export const { setAuthToken, removeAuthToken } = authSlice.actions;
export default authSlice.reducer;
