import { apiSlice } from "../../app/api/apiSlice";

export const StudentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDashData: builder.query({
      query: () => ({
        url: "/dashdata",
      }),
      providesTags: ["DashData"],
    }),
  }),
});

export const { useGetAllDashDataQuery } = StudentsApiSlice;
