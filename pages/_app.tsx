import { GoogleOAuthProvider } from "@react-oauth/google";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "../styles/global.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import FakePage from "../components/FakePage";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import AuthGuard from "../components/AuthGuard";
import getRSS from "../lib/rss";

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
	requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const router = useRouter();

	const getLayout = Component.getLayout ?? ((page) => page);

	useEffect(() => {
		const handleRouteChange = (url: URL) => {
			gtag.pageview(url);
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);
	return (
		<>
			<Head>
				<title>Book Store - A store for booklovers</title>
			</Head>
			<Toaster />
			<Provider store={store}>
				<FakePage />
				<GoogleOAuthProvider clientId={process.env.CLIENT_ID as string}>
					{Component.requireAuth ? (
						<AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
					) : (
						<>{getLayout(<Component {...pageProps} />)}</>
					)}
				</GoogleOAuthProvider>
			</Provider>
		</>
	);
}
export async function getStaticProps() {
	await getRSS();
}
export default MyApp;
