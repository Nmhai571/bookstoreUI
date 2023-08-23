import Slide from "../components/Home/Slide";
import PublicLayout from "../layouts/PublicLayout";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
	return (
		<>
			<Slide />
		</>
	);
};

Home.getLayout = function getLayout(page) {
	return <PublicLayout>{page}</PublicLayout>;
};

export default Home;
