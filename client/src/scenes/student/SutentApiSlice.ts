import { apiSlice } from "../../app/api/apiSlice";

export const StudentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: "/student",
      }),
      providesTags: ["Student"],
    }),
    addNewStudent: builder.mutation({
      query: (formData) => ({
        url: "/student",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Student"],
    }),
    updateStudent: builder.mutation({
      query: (initialStudent) => ({
        url: "/student",
        method: "PATCH",
        body: {
          ...initialStudent,
        },
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: ({ id }) => ({
        url: `/student`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useAddNewStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = StudentsApiSlice;