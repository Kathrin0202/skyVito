import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from "../../api";

export const setUserId = (userId) => {
  return {
    type: "USER_TAG",
    payload: userId,
  };
};

const baseQuery = fetchBaseQuery({
  baseUrl: host,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
export const userApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    uploadUserAvatar: builder.mutation({
      query: (value) => ({
        url: `user/avatar`,
        method: "POST",
        body: value,
      }),
      transformResponse: (response) => {
        localStorage.setItem("avatar", response.access_token);
        return response;
      },
      invalidatesTags: "USER_TAG",
    }),
    getCurrentUserAds: builder.query({
      query: () => `ads/me`,
    }),
  }),
});

export const { useGetCurrentUserAdsQuery, useUploadUserAvatarMutation } =
  userApi;
