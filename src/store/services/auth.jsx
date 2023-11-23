import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  getToken,
  getTokenFromLocalStorage,
  host,
  saveTokenToLocalStorage,
} from "../../api";

export const setUserId = (userId) => {
  return {
    type: "USER_TAG",
    payload: userId,
  };
};

const baseQuery = fetchBaseQuery({
  baseUrl: host,
  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      const token = getTokenFromLocalStorage();
      const data = getToken(token);
      saveTokenToLocalStorage(data);
    }
    return headers;
  },
});
export const userApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCurrentUserAds: builder.query({
      query: () => `ads/me`,
    }),
  }),
});

export const { useGetCurrentUserAdsQuery } = userApi;
