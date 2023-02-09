/* eslint-disable @next/next/no-title-in-document-head */
import Layout from "../components/layout/layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Notification from "../components/ui/notification";
import { NotificationContextProvider } from "../store/notification-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Next Events</title>
          <meta name="description" content="NextJS Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
        <Notification title="Test" message="This is a test" status="success" />
      </Layout>
    </NotificationContextProvider>
  );
}
