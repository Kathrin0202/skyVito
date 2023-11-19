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
    },
  },
});
export const { setAuth } = authSlice.actions;
export default authSlice.reducer;

export const useAuthSelector = () => {
  const { email, id, city, name } = useSelector((store) => store.auth);
  return {
    isAuth: !!id,
    email,
    id,
    city,
    name,
  };
};
