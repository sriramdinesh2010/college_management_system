import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import PulseLoader from "react-spinners/PulseLoader";
import RequireAuth from "./RequireAuth";
import { ROLES } from "../../config/roles";

type ErrorType = {
  data?: {
    message?: string;
  };
};

const PersistLogin: React.FC = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken) as string | null;
  const effectRan = useRef<boolean>(false);

  const [trueSuccess, setTrueSuccess] = useState<boolean>(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line
  }, []);

  let content: JSX.Element = <></>; // Default initialization

  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <RequireAuth allowedRoles={[...Object.values(ROLES)]} />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    content = <PulseLoader color={"#FFF"} />;
  } else if (isError) {
    //persist: yes, token: no
    console.log("error");
    content = (
      <p className="errmsg">
        {`${(error as ErrorType)?.data?.message} - `}
        <Link to="/">Please login again</Link>.
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <RequireAuth allowedRoles={[...Object.values(ROLES)]} />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <RequireAuth allowedRoles={[...Object.values(ROLES)]} />;
  }

  return content;
};

export default PersistLogin;
