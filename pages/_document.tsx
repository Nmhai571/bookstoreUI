import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { MessengerChat } from "react-messenger-chat-plugin";

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="icon" href="/logo.png" />
				<meta
					name="description"
					content="Book Store - A store with over a thousand books around the world."
				/>
				<meta name="google-site-verification" content="5OZYpX3OSwh9wmGgMR3ianBRNNqvO6jf8zD0NbnTtPM" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
					rel="stylesheet"
				/>
				<Script async strategy="lazyOnload" src="https://embed.tawk.to/1g9umnfuk"/>
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id${process.env.GOOGLE_ANALYTICS_ID}`}
					async
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){window.dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}',{
							page_path: window.location.pathname,
						});
					`}
				</Script>
				<Script type="text/javascript" id="tawkto" strategy="afterInteractive">
					{`
						var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
						(function(){
						var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
						s1.async=true;
						s1.src='https://embed.tawk.to/62f100f537898912e961da4f/1g9umnfuk';
						s1.charset='UTF-8';
						s1.setAttribute('crossorigin','*');
						s0.parentNode.insertBefore(s1,s0);
						})();
					`}
				</Script>
			</Head>

			<body>
				<MessengerChat
					pageId="101733195985203"
					language="vi_VN"
					themeColor={"#7928c7"}
					loggedInGreeting="Welcome to Bookove"
					loggedOutGreeting="Bye"
					greetingDialogDisplay={"show"}
				/>
				<div id="fb-root"></div>
				<div id="fb-customer-chat" className="fb-customerchat"></div>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
