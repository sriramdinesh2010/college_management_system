import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryFn,
  FetchArgs,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../scenes/Login/authSlice";
import { RootState } from "../store"; // Import the root state type from your store

// Define a type for the error data if you know its structure
interface RefreshErrorData {
  message?: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/",
  credentials: "include",
  prepareHeaders: (
    headers: Headers,
    { getState }: Pick<BaseQueryApi, "getState">
  ) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // Send refresh token to get a new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // Store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // Retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        // Safely access the error data using the defined type
        const errorData = refreshResult.error.data as RefreshErrorData;
        if (errorData.message) {
          errorData.message = "Your login has expired.";
        }
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Student",
    "SingleStudent",
    "Subject",
    "SingleSubject",
    "Books",
    "Employee",
    "Notes",
    "Admin",
    "DashData",
  ],
  endpoints: (_builder) => ({}),
});
