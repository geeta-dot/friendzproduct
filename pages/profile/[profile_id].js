import React, { useState, useEffect } from "react";
import Profile from "../../src/containers/profile";
import { getSeller } from "../../src/apis/global-api";

const ProfilePage = ({ query }) => {
  const [loading, setloading] = useState(true);
  const [user, setuser] = useState(true);
  const { profile_id } = query;
  useEffect(() => {
    profile_id && findSeller();
  }, [query]);

  const findSeller = async () => {
    getSeller(profile_id).then((user) => {
      setuser(user);
      setloading(false);
    });
  };
  if (!profile_id) return null;
  return <Profile user={user} loading={loading} />;
};

ProfilePage.getInitialProps = ({ query }) => {
  return { query };
};

export default ProfilePage;
