import "../global.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components/Layout";
import LoadingContext from "@/context/LoadingContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoadingContext>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </LoadingContext>
  );
}
