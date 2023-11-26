import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from "../../api";

export const setUserId = (userId) => {
  return {
    type: "USER_TAG",
    payload: userId,
  };
};

export const userApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: host,
  }),
  endpoints: (builder) => ({
    getAllAds: builder.query({
      query: () => "/ads?sorting=new",
      providesTags: "USER_TAG",
    }),
    getAllUserAds: builder.query({
      query: (userId) => `/ads?user_id=${userId}&sorting=new`,
      providesTags: "USER_TAG",
    }),
    getCurrentUserAds: builder.query({
      query: () => `/ads/me`,
    }),
    getAddAds: builder.mutation({
      query: (value) => ({
        url: "/adstext",
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `${value.token.token_type} ${value.token.access_token}`,
        },
        body: value,
      }),
      invalidatesTags: "USER_TAG",
    }),
    postAdsImage: builder.mutation({
      query: ({ token, image, id }) => ({
          url: `/ads/${id}/image`,
          method: 'POST',
          headers: {
              Authorization: `${token.token_type} ${token.access_token}`,
          },
          body: image,
      }),
      invalidatesTags: "USER_TAG",
  }),
  }),
});

export const {
  useGetCurrentUserAdsQuery,
  useGetAddAdsMutation,
  useGetAllAdsQuery,
  useGetAllUserAdsQuery
} = userApi;
