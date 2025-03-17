import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const AdminPrivateRoute = () => {
  const { authUser, setAuthUser } = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const checkFunc = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin-protect`,
        {
          headers: {
            Authorization: `${authUser?.token}`, // Include the token in the request
          },
        }
      );

      if (data?.ok) {
        return setOk(true);
      } else {
        return setOk(false);
      }
    };

    if (authUser?.token) {
      checkFunc();
    }
  }, [authUser?.token]);

  return ok ? <Outlet /> : <Loading />;
};

export default AdminPrivateRoute;
