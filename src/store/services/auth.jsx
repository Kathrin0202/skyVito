import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { host } from "../../api";
import { setAuth } from "../slices/auth";
const USER_TAG = { type: "USER", id: "LIST" };

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: host,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.access_token;
      console.debug("Использую токен из стора", { token });

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);
  console.debug("Результат первого запроса", { result });
  if (result?.error?.status !== 401) {
    return result;
  }
  const forceLogout = () => {
    console.debug("Принудительная авторизация!");
    api.dispatch(setAuth(null));
  };

  const { auth } = api.getState();
  console.debug("Данные пользователя в сторе", { auth });
  if (!auth.refresh) {
    return forceLogout();
  }
  const refreshResult = await baseQuery(
    {
      url: "/auth/login",
      method: "POST",
      body: {
        access_token: auth.access_token,
        refresh_token: auth.refresh_token,
      },
    },
    api,
    extraOptions
  );

  console.debug("Результат запроса на обновление токена", { refreshResult });

  if (!refreshResult.data.access_token) {
    return forceLogout();
  }
  api.dispatch(
    setAuth({ ...auth, access_token: refreshResult.data.access_token })
  );

  const retryResult = await baseQuery(args, api, extraOptions);

  if (retryResult?.error?.status === 401) {
    return forceLogout();
  }

  console.debug("Повторный запрос завершился успешно");

  return retryResult;
};

export const userApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({ url: "/user" }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({
                type: "Profile",
                id,
              })),
              "Profile",
            ]
          : ["Profile"],
    }),
    changeAvatar: builder.mutation({
      query: (value) => ({
        url: "/user/avatar",
        method: "POST",
        body: value,
      }),
      invalidatesTags: USER_TAG,
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
      invalidatesTags: USER_TAG,
    }),
    getAllUsers: builder.query({
      query: () => "/user/all",
    }),
  }),
});

export const {
  useGetUserQuery,
  useChangeAvatarMutation,
  useChangeUserDataMutation,
  useGetAllUsersQuery,
} = userApi;
