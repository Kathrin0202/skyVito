import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

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
};

const authSlice = createSlice({
  name: "auth",
  initialState,
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
    },
  },
});
export const { setAuth } = authSlice.actions;
export default authSlice.reducer;

export const useAuthSelector = () => {
  const { email, id, city, name, surname, sells_from, phone, token } =
    useSelector((store) => store.auth);
  return {
    isAuth: !!id,
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
