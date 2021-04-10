import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import NewRequest from "../../../src/containers/newRequest";

const AddRequestPage = () => {
  const router = useRouter();

  const accessToken = useSelector((state) => state.auth_user.accessToken);
  const user = useSelector((state) => state.auth_user.user);

  useEffect(() => {
    if (!accessToken) {
      window.location.replace("/?signup=open");
    }
  }, []);

  if (!user) return null;

  return <NewRequest user={user} />;
};
export default AddRequestPage;
