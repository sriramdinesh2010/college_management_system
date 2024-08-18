import { apiSlice } from "../../app/api/apiSlice";

export const NoteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: "/notes",
      }),
      providesTags: ["Notes"],
    }),
    addNewNote: builder.mutation({
      query: (noteobject) => ({
        url: "/notes",
        method: "POST",
        body: noteobject,
      }),
      invalidatesTags: ["Notes"],
    }),
    updateNote: builder.mutation({
      query: (initialStudent) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialStudent,
        },
      }),
      invalidatesTags: ["Notes"],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `/notes`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = NoteApiSlice;
