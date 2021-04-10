import React, {useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Post from "../../../src/containers/post";
import { getProduct } from "../../../src/apis/global-api";

const PostPage = ({ query }) => {
  const router = useRouter();

  const accessToken = useSelector((state) => state.auth_user.accessToken);
  const user = useSelector((state) => state.auth_user.user);
  const [product, setproduct] = useState('')
  const { post_id } = query;

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
    post_id && findPost();
  }, [query]);

   const findPost = async () => {
     getProduct(post_id).then((data) => {
       setproduct(data);
    //    setloading(false);
     });
   };

  if (!product) return null;

  return <Post user={user} formtype="edit" product={product} />;
};

PostPage.getInitialProps = ({ query }) => {
  return { query };
};
export default PostPage;
