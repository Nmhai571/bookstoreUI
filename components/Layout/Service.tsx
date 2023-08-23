import { BsLightningFill, BsShieldFillCheck, BsHandThumbsUpFill, BsFillStarFill } from "react-icons/bs";
import ServiceItem from "./ServiceItem";

export default function Service() {
	return (
		<section className="container py-32 grid grid-cols-4 gap-8 lg:grid-cols-2 md:grid-cols-1 md:py-16">
			<ServiceItem
				Icon={BsLightningFill}
				title="Quick Delivery"
				description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
			/>
			<ServiceItem
				Icon={BsShieldFillCheck}
				title="Secure Payment"
				description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
			/>
			<ServiceItem
				Icon={BsHandThumbsUpFill}
				title="Best Quality"
				description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
			/>
			<ServiceItem
				Icon={BsFillStarFill}
				title="Return Guarantee"
				description="Lorem ipsum, dolor sit amet consectetur adipisicing elit."
			/>
		</section>
	);
}
