import { apiSlice } from "../../app/api/apiSlice";

export const BookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBook: builder.query({
      query: () => ({
        url: "/books",
      }),
      providesTags: ["Books"],
    }),
    addNewBook: builder.mutation({
      query: (formData) => ({
        url: "/books",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: (initialStudent) => ({
        url: "/books",
        method: "PATCH",
        body: {
          ...initialStudent,
        },
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: ({ id }) => ({
        url: `/books`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBookQuery,
  useAddNewBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = BookApiSlice;
