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
    const token = sessionStorage.getItem("access_token");
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
    changeAvatar: builder.mutation({
      query: (value) => ({
        url: "/user/avatar",
        method: "POST",
        body: value,
      }),
      invalidatesTags: "USER_TAG",
    }),
    changeUserData: builder.mutation({
      query: (value) => ({
        url: "/user",
        method: "PATCH",
        body: {
          phone: value.phone,
          name: value.name,
          surname: value.surname,
          city: value.city,
        },
      }),
      invalidatesTags: "USER_TAG",
    }),
    uploadUserAvatar: builder.mutation({
      query: (value) => ({
        url: "user/avatar",
        method: "POST",
        body: value,
      }),
      transformResponse: (response) => {
        localStorage.setItem("avatar", response.access_token);
        return response;
      },
      invalidatesTags: "USER_TAG",
    }),
    getAllUsers: builder.query({
      query: () => "/user/all",
    }),
    getCurrentUserAds: builder.query({
      query: () => "ads/me",
    }),
  }),
});

export const {
  useChangeAvatarMutation,
  useChangeUserDataMutation,
  useGetAllUsersQuery,
  useGetCurrentUserAdsQuery,
  useUploadUserAvatarMutation,
} = userApi;
