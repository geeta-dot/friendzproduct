import React, {useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import NewRequest from "../../../../src/containers/newRequest";
import { getRequest } from "../../../../src/apis/global-api";

const EditRequestPage = ({ query }) => {
  const router = useRouter();

  const accessToken = useSelector((state) => state.auth_user.accessToken);
  const user = useSelector((state) => state.auth_user.user);
  const [request, setrequest] = useState('')
  const { request_id } = query;

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
    request_id && findRequest();
  }, [query]);

   const findRequest = async () => {
     getRequest(request_id).then((data) => {
       setrequest(data);
     });
   };

  if (!request) return null;

  return <NewRequest user={user} formtype="edit" product={request} />;
};

EditRequestPage.getInitialProps = ({ query }) => {
  return { query };
};
export default EditRequestPage;
