import Contact from "../components/Layout/Contact";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Service from "../components/Layout/Service";

interface Props {
	children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Service />
			<Contact />
			<Footer />
		</>
	);
}
