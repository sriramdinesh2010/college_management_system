import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Student from "../entities/Student";
const apiClient = new APIClient<Student>("/student");

const useStudent = () =>
  useQuery({
    queryKey: ["student"],
    queryFn: apiClient.getAll,
  });

export default useStudent;
