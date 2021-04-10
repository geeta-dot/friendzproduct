import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Post from "../../src/containers/post";

const PostPage = () => {
  const router = useRouter();

  const accessToken = useSelector((state) => state.auth_user.accessToken);
  const user = useSelector((state) => state.auth_user.user);

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
  }, []);

  if (!user) return null;

  return <Post user={user} />;
};
export default PostPage;
