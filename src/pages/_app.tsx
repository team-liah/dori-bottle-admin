import { fetcher } from "@/client/base";
import { IDefaultLayoutPage } from "@/components/layout/default-layout";
import SeoHead from "@/components/layout/seo-head";
import AuthProvider from "@/lib/auth/auth-provider";
import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import weekday from "dayjs/plugin/weekday";
import { NextComponentType } from "next";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import { SWRConfig } from "swr";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const getLayout =
    (Component as IDefaultLayoutPage).getLayout ||
    ((Page: NextComponentType, props: Record<string, unknown>) => <Page {...props} />);

  return (
    <>
      <SeoHead />
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#056BF1",
            colorLink: "#056BF1",
            colorLinkHover: "#5aa1ff",
          },
        }}
        locale={koKR}
      >
        <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
          <AuthProvider>
            <main className={`${pretendard.variable} font-sans`}>{getLayout(Component, pageProps)}</main>
          </AuthProvider>
        </SWRConfig>
      </ConfigProvider>
    </>
  );
}
