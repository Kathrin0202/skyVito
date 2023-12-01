import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getTokenFromLocalStorage } from "../../api";

const initialState = {
  email: "",
  surname: "",
  city: "",
  name: "",
  avatar: "",
  sells_from: "",
  phone: "",
  role: "",
  id: 0,
  token: "",
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: getTokenFromLocalStorage() ?? initialState,
  reducers: {
    setAuth(state, action) {
      state.email = action.payload.email;
      state.surname = action.payload.surname;
      state.city = action.payload.city;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.sells_from = action.payload.sells_from;
      state.phone = action.payload.phone;
      state.token = action.payload.token;
      state.isAuth = true;

      localStorage.setItem("auth", JSON.stringify(state));
    },
  },
});
export const { setAuth } = authSlice.actions;
export default authSlice.reducer;

export const useAuthSelector = () => {
  const { email, id, city, name, surname, sells_from, phone, token, isAuth } =
    useSelector((store) => store.auth);
  return {
    isAuth,
    email,
    id,
    city,
    name,
    surname,
    sells_from,
    phone,
    token,
  };
};
