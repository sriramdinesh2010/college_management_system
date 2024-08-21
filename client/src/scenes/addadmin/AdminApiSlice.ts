import { apiSlice } from "../../app/api/apiSlice";

export const AdminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["Admin"],
    }),
    addNewAdmin: builder.mutation({
      query: (formData) => ({
        url: "/users",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Admin"],
    }),
    updateAdmin: builder.mutation({
      query: (initialStudent) => ({
        url: "/users",
        method: "PATCH",
        body: {
          ...initialStudent,
        },
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteAdmin: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useAddNewAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = AdminApiSlice;
