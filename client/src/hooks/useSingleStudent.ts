import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Student from "../entities/Student";
const apiClient = new APIClient<Student>("/singlestudent");

const useSingleStudent = (registernumber: number) =>
  useQuery({
    queryKey: ["singlestudent"],
    queryFn: () => apiClient.get(registernumber),
    staleTime: 7200000,
  });

export default useSingleStudent;
