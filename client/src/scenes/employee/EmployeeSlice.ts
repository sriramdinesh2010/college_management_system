import { apiSlice } from "../../app/api/apiSlice";

export const EmployeeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployee: builder.query({
      query: () => ({
        url: "/employee",
      }),
      providesTags: ["Employee"],
    }),
    addNewEmployee: builder.mutation({
      query: (formData) => ({
        url: "/employee",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation({
      query: (initialStudent) => ({
        url: "/employee",
        method: "PATCH",
        body: {
          ...initialStudent,
        },
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation({
      query: ({ id }) => ({
        url: `/Employee`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetEmployeeQuery,
  useAddNewEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = EmployeeApiSlice;
