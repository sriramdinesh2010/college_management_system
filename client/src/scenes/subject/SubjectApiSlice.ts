import { apiSlice } from "../../app/api/apiSlice";

export const SubjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubject: builder.query({
      query: () => ({
        url: "/subject",
      }),
      providesTags: ["Subject"],
    }),

    SingleSubject: builder.query({
      query: (subjectcode) => ({
        url: "/subject/singlesubject",
        method: "POST",
        body: subjectcode,
      }),
      providesTags: ["SingleSubject"],
    }),

    addNewSubject: builder.mutation({
      query: (subjectdata) => ({
        url: "/subject",
        method: "POST",
        body: subjectdata,
      }),
      invalidatesTags: ["Subject"],
    }),
    updateSubject: builder.mutation({
      query: (initialStudent) => ({
        url: "/subject",
        method: "PATCH",
        body: {
          ...initialStudent,
        },
      }),
      invalidatesTags: ["Subject"],
    }),
    deleteSubject: builder.mutation({
      query: ({ id }) => ({
        url: `/subject`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Subject"],
    }),
  }),
});

export const {
  useGetSubjectQuery,
  useSingleSubjectQuery,
  useAddNewSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = SubjectApiSlice;
