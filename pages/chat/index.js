import React, { useEffect } from "react";
import Layout from "../../src/Layout";
import Chat from "../../src/components/Chat";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function ChatPage() {
  const accessToken = useSelector((state) => state.auth_user.accessToken);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
     window.location.replace("/?signup=open");
    }
  }, []);

  return (
    <Layout nofooter={true}>
      <Chat />
    </Layout>
  );
}
