import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import Employee from "../entities/Empolyee";
const apiClient = new APIClient<Employee>("/employee");

const useStudent = () =>
  useQuery({
    queryKey: ["employee"],
    queryFn: apiClient.getAll,
  });

export default useStudent;
