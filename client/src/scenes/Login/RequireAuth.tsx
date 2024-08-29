import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Layout from "../layout";
interface Props {
  allowedRoles: any;
}
const RequireAuth = ({ allowedRoles }: Props) => {
  const location = useLocation();
  const { roles } = useAuth();

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Layout />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
  return content;
};
export default RequireAuth;
