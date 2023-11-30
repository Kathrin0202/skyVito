import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage, host } from "../../api";

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
    /*prepareHeaders: (headers) => {
      const token = getTokenFromLocalStorage();
      console.debug("Токен из стора", { token });
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },*/
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
      query: ({ id, token, title, description, price }) => ({
        url: `/ads/${id}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `${token.token_type} ${token.access_token}`,
        },
        body: JSON.stringify({
          title,
          description,
          price,
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
    deleteAds: builder.mutation({
      query: ({ id, token }) => {
        return {
          url: `/ads/${id}`,
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        };
      },
      invalidatesTags: "USER_TAG",
    }),
    deleteAdsImages: builder.mutation({
      query: ({ image, token, id }) => {
        const url = image?.url;
        console.log(url);
        return {
          url: `/ads/${id}/image?file_url=${url}`,
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        };
      },
      invalidatesTags: "USER_TAG",
    }),
    getAllComments: builder.query({
      query: (id) => `/ads/${id}/comments`,
      invalidatesTags: "USER_TAG",
    }),
    addComment: builder.mutation({
      query: ({ token, text, id }) => ({
        url: `/ads/${id}/comments`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `${token.token_type} ${token.access_token}`,
        },
        body: JSON.stringify({ text }),
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
  useDeleteAdsMutation,
  useDeleteAdsImagesMutation,
  useGetAllCommentsQuery,
  useAddCommentMutation,
} = userApi;
