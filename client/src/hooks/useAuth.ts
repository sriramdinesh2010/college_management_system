import { useSelector } from "react-redux";
import { selectCurrentToken } from "../scenes/Login/authSlice";
import { jwtDecode } from "jwt-decode";
interface JwtPayload {
  UserInfo: {
    email: String;
    roles: String[];
  };
}
const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isEmployee = false;
  let isAdmin = false;
  let status = "student";

  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    const { email, roles } = decoded.UserInfo;

    isEmployee = roles.includes("Employee");
    isAdmin = roles.includes("Admin");

    if (isEmployee) status = "Employee";
    if (isAdmin) status = "Admin";

    return { email, roles, status, isEmployee, isAdmin };
  }

  return { email: "", roles: [], isEmployee, isAdmin, status };
};
export default useAuth;
