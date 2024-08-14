import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Note from "../entities/Note";
const apiClient = new APIClient<Note>("/notes");

const useNote = () =>
  useQuery({
    queryKey: ["notes"],
    queryFn: apiClient.getAll,
  });
export default useNote;
