import React, {useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import NewEvent from "../../../../src/containers/newEvent";
import { getEvent } from "../../../../src/apis/global-api";

const EditEventPage = ({ query }) => {
  const router = useRouter();

  const accessToken = useSelector((state) => state.auth_user.accessToken);
  const user = useSelector((state) => state.auth_user.user);
  const [event, setevent] = useState('')
  const { event_id } = query;

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
    event_id && findPost();
  }, [query]);

   const findPost = async () => {
     getEvent(event_id).then((data) => {
       setevent(data);
    //    setloading(false);
     });
   };

  if (!event) return null;

  return <NewEvent user={user} formtype="edit" event={event} />;
};

EditEventPage.getInitialProps = ({ query }) => {
  return { query };
};
export default EditEventPage;
