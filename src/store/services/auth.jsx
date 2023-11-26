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
    getAdsById: builder.query({
      query: (id) => `/ads/${id}`,
      providesTags: "USER_TAG",
    }),
    getAddAds: builder.mutation({
      query: (data) => ({
        url: "/adstext",
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `${data.token.token_type} ${data.token.access_token}`,
        },
        body: JSON.stringify(data.ads),
      }),
      invalidatesTags: "USER_TAG",
    }),
    getEditAds: builder.mutation({
      query: (ads) => ({
        url: `/ads/${ads.id}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `${ads.token.token_type} ${ads.token.access_token}`,
        },
        body: JSON.stringify({
          title: ads.title,
          description: ads.description,
          price: ads.price,
        }),
      }),
      invalidatesTags: "USER_TAG",
    }),
    postAdsImage: builder.mutation({
      query: ({ token, image, id }) => ({
        url: `/ads/${id}/image`,
        method: "POST",
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
  useGetAdsByIdQuery,
  useGetAddAdsMutation,
  usePostAdsImageMutation,
  useGetAllAdsQuery,
  useGetAllUserAdsQuery,
  useGetEditAdsMutation,
} = userApi;
